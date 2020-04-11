var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var {db} = require('./config/services/firebase');
const request = require('request');
const mime = require('mime-types');
const React = require("react")
const ReactDOMServer = require('react-dom/server');
// const path path('path';
// import { Server } from 'http';
// import { renderToString } from 'react-dom/server';
// import { match, RouterContext } from 'react-router';
// import routes from './routes';
// import NotFoundPage from './components/NotFoundPage';

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
// app.use(express.static(__dirname+'/static'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
import compression from "compression";
import ssr from "./src/routes/ssr";

app.get('/', function (req, res) {
  // var markup = ReactDOMServer.renderToString(
  //   App()
  // );
    res.render(__dirname+ '/view/components/Html', { name: 'John', data: {name: 'amit'} });
  });

  app.get('/ping', function (req, res) {
    res.send('working');
  });

  // app.use(compression());
  // app.use("/firstssr", ssr);

  app.get('/:userId/videos/:videoId', function (req, res) {
    db.collection("users")
    .doc(req.params.userId)
    .collection("videos")
    .doc(req.params.videoId).onSnapshot(function(snapshot) {
      console.log(snapshot.data())
          const data = snapshot.data();
          global.videoUrl = snapshot.data().outputUrl;
          global.fileName = snapshot.data().outputVideoId;
          res.render(__dirname+ '/view/components/SingleVideoShare/index', { video: snapshot.data(), fullUrl: (req.protocol + '://' + req.get('host') + req.originalUrl), urlDownLoad: snapshot.data().outputUrl, videoLibrary: false });
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        res.render(__dirname+ '/view/components/SingleVideoShare/index', { video: {}, fullUrl: (req.protocol + '://' + req.get('host') + req.originalUrl), videoLibrary: false });
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

      app.get('/videolibrary/:videoId', function (req, res) {
        db.collection("videolibrary")
        .doc(req.params.videoId)
        .onSnapshot(function(snapshot) {
          console.log(snapshot.data())
              const data = snapshot.data();
              // global.videoUrl = snapshot.data().outputUrl;
              // global.fileName = snapshot.data().outputVideoId;
              res.render(__dirname+ '/view/components/SingleVideoShare/index', { video: snapshot.data(), fullUrl: (req.protocol + '://' + req.get('host') + req.originalUrl), videoLibrary: true });
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
            res.render(__dirname+ '/view/components/SingleVideoShare/index', { video: {}, fullUrl: (req.protocol + '://' + req.get('host') + req.originalUrl),videoLibrary: true });
          });
      });

app.listen(8080, function () {
    console.log('Example app listening on port 8080 !');
});