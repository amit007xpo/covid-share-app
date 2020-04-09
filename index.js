var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var {db} = require('./config/services/firebase');
const request = require('request');
const mime = require('mime-types');


app.set('views', __dirname + '/view');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use('/public',express.static(__dirname+'/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', function (req, res) {
    res.render(__dirname+ '/view/components/LandingPage/index', { name: 'John' });
  });

  app.get('/ping', function (req, res) {
    res.send('working');
  });

  app.get('/:userId/videos/:videoId', function (req, res) {
    db.collection("users")
    .doc(req.params.userId)
    .collection("videos")
    .doc(req.params.videoId).onSnapshot(function(snapshot) {
      console.log(snapshot.data())
          const data = snapshot.data();
          global.videoUrl = snapshot.data().outputUrl;
          global.fileName = snapshot.data().outputVideoId;
          res.render(__dirname+ '/view/components/SingleVideoShare/index', { video: snapshot.data(), fullUrl: (req.protocol + '://' + req.get('host') + req.originalUrl), urlDownLoad: snapshot.data().outputUrl });
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        res.render(__dirname+ '/view/components/SingleVideoShare/index', { video: {}, fullUrl: (req.protocol + '://' + req.get('host') + req.originalUrl) });
      });
  });

  app.get('/download/video', function (req, res) { 
        const url = global.videoUrl;
          // const filename = url.split('/').pop();// custom file name
          const filename = global.fileName;
          const mimetype = mime.lookup('mp4');
          // console.log(mimetype);
          const headers = {
              'Content-Disposition': 'attachment; filename=' + filename,
              'Content-type': mimetype
          };
          res.set(headers);
          request(url).pipe(res);
      })

app.listen(8080, function () {
    console.log('Example app listening on port 8080 !');
});