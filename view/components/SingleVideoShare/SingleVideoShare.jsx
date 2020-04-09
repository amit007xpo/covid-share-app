var React = require("react");
// var { getVideo } = require("../../helpers/db");
var axios = require('axios')
// var Loader from "react-loader-spinner";

var VideoCard = require("../VideoCard");
// import "./SingleVideoShare.scss";
var NavigationBar = require('../NavigationBar');
var Layout = require('../layouts/default');

class SingleVideoShare extends React.Component {
  // static defaultProps = {
  //   shouldDisplayMenu: true
  // };

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
    
    // getVideo(this.props.match.params.userId, this.props.match.params.id).onSnapshot(querySnapshot => {
    //   console.log(querySnapshot.data())

    //   this.tryRequire(querySnapshot.data().outputUrl).then(res=>{
    //     console.log(res);
    //     this.setState({
    //       videoFileExists: true,
    //       video: querySnapshot.data(),
    //       isLoading: false
    //     });
    //   }, err=> {
    //     console.log(err)
    //     this.setState({
    //       videoFileExists: false
    //     });
    //     alert("file does not exist!");
    //   });
    //   // this.setState({
    //   //         video: querySnapshot.data(),
    //   //         isLoading: false
    //   //       });
    // });
  }

//  tryRequire = (url) => {
//   var config = {
//     headers: {'Access-Control-Allow-Origin': '*'}
//   };
//    return axios({
//       url: url,
//       method: 'GET',
//       responseType: 'blob', // important
//       config
//     })
// }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return Object.keys(this.state.video).length === 0;
  // }

  render() {
    const baseClassName = "psa-single-video-share";
  
    // const { isLoading, video } = this.state;
    const { video, fullUrl, urlDownLoad } = this.props;
    // console.log(video);
    
    if (video ===undefined || Object.keys(video).length === 0) {
      // TODO : User might have no videos, to be fixed
      return (
        <div className={`${baseClassName}__loader-div`}>
            loading....
        </div>
      );
    }
    return (
      <Layout video={video} fullUrl={fullUrl}>
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