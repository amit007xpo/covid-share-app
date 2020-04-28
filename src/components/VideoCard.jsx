import React, { Component } from "react";
import axios from 'axios'
// import { withRouter } from "react-router-dom";
import {ResponsiveEmbed} from 'react-bootstrap';
import Moment from 'react-moment'
import { Modal, Button, Form, Col, InputGroup, FormControl, Image } from 'react-bootstrap';
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
          Steps to upload on {props.socialMedia}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Steps:</h4>
        <p>
          <ol>
             <li>
                 <h6>Download the video</h6>
                 <Image src="/public/media/psa.jpg" alt="social media" className={`${props.baseClassName}__social-media`} fluid/>
              </li> 
              <li>
                <h6>Open the {props.socialMedia}</h6>
              </li> 
              <li>
                 <h6>Upload the video</h6>
                 <Image src={props.socialMedia === 'TikTok' ? "/public/media/titktok.jpg" : "/public/media/instagram.jpg"} alt="social media" className={`${props.baseClassName}__social-media`} fluid />
              </li>
          </ol>
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
      modalShow: false,
      socialMedia: ''
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
 setModalShow = (value, media) => {
  this.setState({modalShow: value, socialMedia: media})
}
  render() {
    const { url, name, date, videoLibrary, videoUrl, fullUrl, description } = this.props;
    console.log(fullUrl);
    const baseClassName = "psa-video-card";
    const {modalShow, socialMedia} = this.state;

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
                <video controls className={`${baseClassName}__video-tag`}>
                        <source src={url} type="video/mp4" media="screen and (min-device-width:401px)"/>
                        {/* <source src="movie.ogg" type="video/ogg" /> */}
                        Your browser does not support the video tag.
                    </video>
                 </ResponsiveEmbed>
            }
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
        {/* <p className={`${baseClassName}__share-text`}>Share</p> */}
        <div className={`${baseClassName}__share-download-div`}>
        <div className={`${baseClassName}__share`}>
          <FacebookShareButton url={fullUrl} quote={description} hashtags={[`covid19`, 'saveWorld']}>
            <FacebookIcon size="35" round={true} />
          </FacebookShareButton>

          <LinkedinShareButton url={fullUrl}>
            <LinkedinIcon size="35" round={true} />
          </LinkedinShareButton>

          <TwitterShareButton url={fullUrl} title={description} hashtags={[`covid19`, 'saveWorld']}>
            <TwitterIcon size="35" round={true} />
          </TwitterShareButton>

          <TelegramShareButton title={description} url={fullUrl}>
            <TelegramIcon size="35" round={true} />
          </TelegramShareButton>

          <WhatsappShareButton url={fullUrl} title={description} separator={`:-`}>
            <WhatsappIcon size="35" round={true} />
          </WhatsappShareButton>

          <EmailShareButton url={fullUrl} subject={`Share awareness for covid-19`} body={description} separator=':-'>
            <EmailIcon size="35" round={true} />
          </EmailShareButton>
          {/* <InstagramIcon size="30" round={true} /> */}
          <button className={`${baseClassName}__social-button`} onClick={() => this.setModalShow(true, 'Instagram')}>
            <img src="/public/media/insta.png" alt="tiktok" className={`${baseClassName}__social-image`}/>
          </button>
          <button className={`${baseClassName}__social-button`} onClick={() => this.setModalShow(true,'TikTok')}>
            <img src="/public/media/titktok.png" alt="tiktok" className={`${baseClassName}__social-image`}/>
          </button>
        </div>
        
        <div className={`${baseClassName}__download`}>
            <Button onClick={()=>this.downloadFile()} className={`${baseClassName}__download-button`} style={{backgroundColor: 'transparent'}}><FaDownload color={"white"} text="Download"/> Download Video</Button>
        </div>
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
        
        
        <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => this.setModalShow(false)}
        socialMedia={this.state.socialMedia}
        baseClassName={baseClassName}
      />
      </div>
    );
  }
}

VideoCard.propTypes = {};

export default VideoCard;
