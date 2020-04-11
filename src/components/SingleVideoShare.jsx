import React, { Component } from "react";
// import {Helmet} from "react-helmet";
// import { getVideo } from "../../helpers/db";
import axios from 'axios'
import Loader from "react-loader-spinner";

import { Modal, Button } from 'react-bootstrap';
import VideoCard from "./VideoCard";

// import "./SingleVideoShare.scss";

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Steps to upload on social media
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            <ul>
               <li>
                   Download the video
                </li> 
                <li>
                   Upload the video
                </li> 
            </ul>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  

class SingleVideoShare extends Component {
  static defaultProps = {
    shouldDisplayMenu: true,
    video: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      video: {},
      isLoading: false,
      videoFileExists: false,
      modalShow: false
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    })
  }

 tryRequire = (url) => {
  var config = {
    headers: {'Access-Control-Allow-Origin': '*'}
  };
   return axios({
      url: url,
      method: 'GET',
      responseType: 'blob', // important
      config
    })
}

setModalShow = (value) => {
    this.setState({modalShow: value})
}


  render() {
    const baseClassName = "psa-single-video-share";

    const { isLoading } = this.props;
    const {video, fullUrl, videoLibrary} = this.props.data;
    console.log(video)
    console.log(fullUrl)
    console.log(videoLibrary)
    const {modalShow} = this.state;
    
    if (isLoading) {
      // TODO : User might have no videos, to be fixed
      return (
        <div className={`${baseClassName}__loader-div`}>
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
        </div>
      );
    }
    return (
      <div className={`${baseClassName}`}>
        <div className={`${baseClassName}__video-div`}>
        <VideoCard
         url={video.outputUrl}
         name={video.psaName} 
         date={video.createdDate ? new Date(video.createdDate.seconds*1000) : video.createdDate}
         outputVideoId={video.outputVideoId}
         videoId={video.videoId}
         fullUrl={fullUrl}
         videoLibrary={videoLibrary}
         videoUrl={video.video_url}
         />
         </div>

    <Button variant="primary" onClick={() => this.setModalShow(true)}>
        Upload on Plateforms Like Tik-tok and Instagram
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => this.setModalShow(false)}
      />
      </div>
    );
  }
}

SingleVideoShare.propTypes = {};

export default SingleVideoShare;
