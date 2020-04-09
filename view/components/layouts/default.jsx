var React = require('react');

function DefaultLayout(props) {
  const {video, fullUrl} = props;
  return (
    <html>
      <head>
       <title>Covid-19</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta property="fb:app_id" content="1382573961914383" />
        <meta property="og:locale" content="en_US" />
        <meta charSet="utf-8" />
            <meta name="description" content="Help to spread awareness for covid-19" />
            <link rel="canonical" href={fullUrl} />

            <meta property="og:url" content={fullUrl} />
            <meta property="og:type" content="video.movie" />
            <meta property="og:title" content={video.psaName} />
            <meta property="og:description" content="Help to spread awareness for covid-19" />
            {/* <meta property="og:image" content="https://homepages.cae.wisc.edu/~ece533/images/airplane.png" /> */}
            <meta property="og:video" content={video.outputUrl} />
            <meta property="og:video:secure_url" content={video.outputUrl} />
            <meta property="og:video:type" content="video/mp4" />
            <meta property="og:video:width" content="400" />
            <meta property="og:video:height" content="300" />
            
            <meta property="twitter:type" content="video.movie" />
            <meta name="twitter:title" content={video.psaName} />
            <meta name="twitter:description" content="Help to spread awareness for covid-19" />
            <meta name="twitter:image" content="https://images.unsplash.com/photo-1585411241865-a7762556ce2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80" />
            {/* <meta property="twitter:video" content={video.outputUrl} /> */}

            <meta name="twitter:card" content="Help to spread awareness for covid-1" />
            <meta name="twitter:site" content="Covid-19@share" />
            <meta name="twitter:creator" content="user-name" />
            <meta property="og:image" content="https://images.unsplash.com/photo-1585411241865-a7762556ce2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80" />
        <link rel="stylesheet" type="text/css" href="/public/css/style.css" />
        <script>
          console.log('hi')
        </script>
      </head>
      <body>{props.children}</body>
    </html>
  );
}

module.exports = DefaultLayout;