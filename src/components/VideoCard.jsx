import React, { Component } from "react";
import axios from 'axios'
// import { withRouter } from "react-router-dom";
import {ResponsiveEmbed} from 'react-bootstrap';
import Moment from 'react-moment'
import { Modal, Button, Form, Col, InputGroup, FormControl } from 'react-bootstrap';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  EmailIcon
} from "react-share";
import { FaDownload } from "react-icons/fa";
// import Insta from '../images/insta'
// import Tiktok from '../images/tiktok.png'
// import "./VideoCard.scss";



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
        <h4>Steps:</h4>
        <p>
          <ul>
             <li>
                 Download the video
              </li> 
              <li>
                 Open the App (titok/instagram)
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


class VideoCard extends Component {
  static defaultProps = {
    shouldDisplayMenu: true,
    userId: ''
  };
  constructor(props){
    super(props);
    this.state = {
      modalShow: false
    }
  }
  redirectToSingleVideo = () => {
    if (this.props.redirect)
      this.props.history.replace(`/${this.props.userId}/videos/${this.props.psaId}`);
  };

 downloadFile = () => {
  var config = {
    headers: {'Access-Control-Allow-Origin': '*'}
  };
    axios({
      url: this.props.url,
      method: 'GET',
      responseType: 'blob', // important
      config
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', this.props.outputVideoId);
      document.body.appendChild(link);
      link.click();
  });
 }
 setModalShow = (value) => {
  this.setState({modalShow: value})
}
  render() {
    const { url, name, date, videoLibrary, videoUrl, fullUrl } = this.props;
    console.log(fullUrl);
    const baseClassName = "psa-video-card";
    const {modalShow} = this.state;

    return (
      <div className={`${baseClassName}`}>
        <div className={`${baseClassName}__video-div`}>

            {
                videoLibrary && <ResponsiveEmbed aspectRatio="16by9">
                    <iframe width="400" height="300" src={videoUrl}>
                    </iframe>
                    </ResponsiveEmbed>
            }
            {
                !videoLibrary &&  <ResponsiveEmbed aspectRatio="16by9">
                <video width="400" height="300" controls className={`${baseClassName}__video-tag`}>
                        <source src={url} type="video/mp4" />
                        {/* <source src="movie.ogg" type="video/ogg" /> */}
                        Your browser does not support the video tag.
                    </video>
                 </ResponsiveEmbed>
            }
        </div>
        <div
          className={`${baseClassName}__name`}
          onClick={() => this.redirectToSingleVideo()}
        >
          <h3>{name}</h3>
        </div>
        <div className={`${baseClassName}__date`}>
         <Moment format="dddd, MMMM D, YYYY hh:mm A" withTitle>{date}</Moment>
        </div>
        
        <p className={`${baseClassName}__share-text`}>Share</p>
        
        <div className={`${baseClassName}__share`}>
          <FacebookShareButton url={fullUrl} quote={`Share awareness for covid-19`} hashtags={[`covid19`, 'saveWorld']}>
            <FacebookIcon size="30" round={true} />
          </FacebookShareButton>

          <LinkedinShareButton url={fullUrl}>
            <LinkedinIcon size="30" round={true} />
          </LinkedinShareButton>

          <TwitterShareButton url={fullUrl} title={`Share awareness for covid-19`} hashtags={[`covid19`, 'saveWorld']}>
            <TwitterIcon size="30" round={true} />
          </TwitterShareButton>

          <TelegramShareButton title={'Share awareness for covid-19'} url={fullUrl}>
            <TelegramIcon size="30" round={true} />
          </TelegramShareButton>

          <WhatsappShareButton url={fullUrl} title={'Share awareness for covid-19'} separator={`:-`}>
            <WhatsappIcon size="30" round={true} />
          </WhatsappShareButton>

          <EmailShareButton url={fullUrl} subject={`Share awareness for covid-19`} body={`This video tell you about covid-19`} separator=':-'>
            <EmailIcon size="30" round={true} />
          </EmailShareButton>
          {/* <InstagramIcon size="30" round={true} /> */}
          <button className={`${baseClassName}__social-button`} onClick={() => this.setModalShow(true)}>
            <img src="/public/media/insta.png" alt="tiktok" className={`${baseClassName}__social-image`}/>
          </button>
          <button className={`${baseClassName}__social-button`} onClick={() => this.setModalShow(true)}>
            <img src="/public/media/titktok.png" alt="tiktok" className={`${baseClassName}__social-image`}/>
          </button>
        </div>
        <div className={`${baseClassName}__download`}>
            <Button onClick={()=>this.downloadFile()} className={`${baseClassName}__download-button`} style={{backgroundColor: 'transparent'}}><FaDownload color={"white"} text="Download"/> Download Video</Button>
        </div>
        
        <div>
        <InputGroup className="mb-3">
            <FormControl
              placeholder={fullUrl}
              aria-label="Page Url"
              value={fullUrl}
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" className={`${baseClassName}__button-share-url`} onClick={() => {navigator.clipboard.writeText(fullUrl)}} style={{color: 'white'}}>Copy page url</Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
        <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => this.setModalShow(false)}
      />
      </div>
    );
  }
}

VideoCard.propTypes = {};

export default VideoCard;
