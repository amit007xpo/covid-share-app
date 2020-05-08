var React = require("react");
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

      </Layout>
    );
  }
}

SingleVideoShare.propTypes = {};

module.exports = SingleVideoShare;

