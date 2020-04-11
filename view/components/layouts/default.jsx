var React = require('react');
import 'bootstrap/dist/css/bootstrap.min.css';

function DefaultLayout(props) {
  const {video, fullUrl, videoLibrary} = props;
  const dataToSend = {
    video: video,
    fullUrl: fullUrl,
    videoLibrary: videoLibrary
  }
  return (
    <html>
      <head>
       <title>Covid-19</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta property="fb:app_id" content="1382573961914383" />
        <meta property="og:locale" content="en_US" />
        <meta charSet="utf-8" />
            <meta name="description" content={video.description} />
            <link rel="canonical" href={fullUrl} />

            <meta property="og:url" content={fullUrl} />
            <meta property="og:type" content="video.movie" />
            <meta property="og:title" content={videoLibrary ? video.video_title : video.psaName} />
            <meta property="og:description" content={video.description} />
            {/* <meta property="og:image" content="https://homepages.cae.wisc.edu/~ece533/images/airplane.png" /> */}
            <meta property="og:video" content={video.outputUrl} />
            {/* <meta property="og:video:url" content={video.outputUrl} /> */}
            <meta property="og:video:secure_url" content={videoLibrary ? video.video_url :video.outputUrl} />
            <meta property="og:video:type" content="video/mp4" />
            <meta property="og:video:width" content="400" />
            <meta property="og:video:height" content="300" />
            
            <meta property="twitter:type" content="video.movie" />
            <meta name="twitter:title" content={videoLibrary ? video.video_title : video.psaName} />
            <meta name="twitter:description" content={video.description} />
            <meta name="twitter:image" content="https://images.unsplash.com/photo-1585411241865-a7762556ce2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80" />
            <meta name="twitter:image:src" content="https://images.unsplash.com/photo-1585411241865-a7762556ce2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80" />
            {/* <meta property="twitter:video" content={video.outputUrl} /> */}
            <meta name="twitter:player" content={videoLibrary ? video.video_url :video.outputUrl} />
            <meta name="twitter:card" content="player" />
            <meta name="twitter:player:width" content="400" />
            <meta name="twitter:player:height" content="300" />
            <meta name="twitter:site" content="@share" />
            <meta name="twitter:creator" content="user-name" />
            <meta property="og:image" content="https://images.unsplash.com/photo-1585411241865-a7762556ce2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80" />
        <link rel="stylesheet" type="text/css" href="/public/css/style.css" />
      </head>
      <body>
        {/* {props.children} */}
          <div id="reactele" data-react= {JSON.stringify(dataToSend)}></div>
        <script src="/app.js" charSet="utf-8"></script>
        <script src="/vendor.js" charSet="utf-8"></script>
      </body>
    </html>
  );
}

module.exports = DefaultLayout;