var React = require("react");
var VideoCard = require("../VideoCard");
var NavigationBar = require('../NavigationBar');
var Layout = require('../layouts/default');

class SingleVideoShare extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      video: {},
      isLoading: false,
      videoFileExists: false
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    })
  }
 
  render() {
    const baseClassName = "psa-single-video-share";
    // const [modalShow, setModalShow] = React.useState(false);
    const { video, fullUrl, urlDownLoad, videoLibrary } = this.props;
    if (video ===undefined || Object.keys(video).length === 0) {
      // TODO : User might have no videos, to be fixed
      return (
        <div className={`${baseClassName}__loader-div`}>
            <p>Userid or videoId is not found</p>
        </div>
      );
    }
    return (
      <Layout video={video} fullUrl={fullUrl} videoLibrary={videoLibrary}>
      <div className={`${baseClassName}`}>
        <NavigationBar />
      <div className={`${baseClassName}__video-div`}>
        <VideoCard
         url={video.outputUrl}
         name={video.psaName} 
         date={video.createdDate ? new Date(video.createdDate.seconds*1000) : video.createdDate}
         outputVideoId={video.outputVideoId}
         videoId={video.videoId}
         fullUrl={fullUrl}
         urlDownLoad={urlDownLoad}
         />
        </div>
      </div>

      </Layout>
    );
  }
}

SingleVideoShare.propTypes = {};

module.exports = SingleVideoShare;

