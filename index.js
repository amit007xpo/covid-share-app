var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var {db} = require('./config/services/firebase');

const options = {
  "doctype": "<!DOCTYPE html>",
  "beautify": false,
  "transformViews": true,
  "babel": {
            presets: ['@babel/preset-react', [ '@babel/preset-env', {'targets': {'node': 'current'}}]],
            plugins: [
                [
                  "@babel/plugin-proposal-class-properties"
                ]]
              }
}
app.set('views', __dirname + '/view');
app.use(express.static("public"));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine(options));

app.use('/public',express.static(__dirname+'/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
import compression from "compression";
import ssr from "./src/routes/ssr";

app.get('/', function (req, res) {

    res.render(__dirname+ '/view/components/Html', { name: 'John', data: {name: 'amit'} });
  });

  app.get('/ping', function (req, res) {
    res.send('working');
  });

  app.get('/:userId/videos/:videoId', function (req, res) {
    db.collection("users")
    .doc(req.params.userId)
    .collection("videos")
    .doc(req.params.videoId).onSnapshot(function(snapshot) {
      // console.log(snapshot.data())
          const data = snapshot.data();
          res.render(__dirname+ '/view/components/SingleVideoShare/index', { video: snapshot.data(), fullUrl: (req.protocol + '://' + req.get('host') + req.originalUrl), videoLibrary: false });
      }, function (errorObject) {
        // console.log("The read failed: " + errorObject.code);
        res.render(__dirname+ '/view/components/SingleVideoShare/index', { video: {}, fullUrl: (req.protocol + '://' + req.get('host') + req.originalUrl), videoLibrary: false });
      });
  });


      app.get('/videolibrary/:videoId', function (req, res) {
        db.collection("videolibrary")
        .doc(req.params.videoId)
        .onSnapshot(function(snapshot) {
          // console.log(snapshot.data())
              const data = snapshot.data();
              res.render(__dirname+ '/view/components/SingleVideoShare/index', { video: snapshot.data(), fullUrl: (req.protocol + '://' + req.get('host') + req.originalUrl), videoLibrary: true });
          }, function (errorObject) {
            // console.log("The read failed: " + errorObject.code);
            res.render(__dirname+ '/view/components/SingleVideoShare/index', { video: {}, fullUrl: (req.protocol + '://' + req.get('host') + req.originalUrl),videoLibrary: true });
          });
      });

app.listen(8080, function () {
    console.log('Example app listening on port 8080 !');
});