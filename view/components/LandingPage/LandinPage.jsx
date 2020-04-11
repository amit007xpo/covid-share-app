var React = require('react');
var DefaultLayout = require('../layouts/default');
var Loader = require("react-loader-spinner");
var Helmet = require("react-helmet");
var VideoCard = require("../VideoCard")

class LandingPage extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
        videos: [1,2,3,4],
        isLoading: false,
        psaId: []
      };
    }
  
    render() {
      const baseClassName = "psa-landing-page";
      const { isLoading, videos, psaId, userId, htmlToSend } = this.state;

      const mystyle = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Arial"
      };

      return (
        <div className={`${baseClassName}`} style={mystyle}>
            {/* <Helmet>
              <meta charSet="utf-8" />
              <title>Covid-19</title>
              <meta name="description" content="Help to spread awareness for covid-19" />
              <link rel="canonical" href="http://mysite.com/example" />
  
              <meta property="og:title" content="Avareness for covid" />
              <meta property="og:description" content="Help to spread awareness for covid-19" />
              <meta property="og:image" content="https://homepages.cae.wisc.edu/~ece533/images/airplane.png" />
              <meta property="og:url" content={window.location} />
  
              <meta name="twitter:title" content="Avareness for covid" />
              <meta name="twitter:description" content="Help to spread awareness for covid-19" />
              <meta name="twitter:image" content="https://homepages.cae.wisc.edu/~ece533/images/airplane.png" />
              <meta name="twitter:card" content="summary_large_image" />
          </Helmet> */}
          <div className={`${baseClassName}__video-list`}>
            {/* {videos.map((video, index) => {
              return (
                <VideoCard
                  url={video.outputUrl}
                  name={video.psaName}
                  outputVideoId={video.outputVideoId}
                  key={index}
                  userId={userId}
                  psaId={psaId[index]}
                  videoId={video.videoId}
                  redirect={true}
                  date={video.createdDate ? new Date(video.createdDate.seconds*1000) : video.createdDate}
                />
              );
            })} */}
            {/* hello dude */}

          </div>

          <div>{htmlToSend}</div>
        </div>
      );
    }
  }
  
  LandingPage.propTypes = {};

  
module.exports = LandingPage;