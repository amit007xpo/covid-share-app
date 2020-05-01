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
import locale from "../localize.json";
// import Insta from '../images/insta'
// import Tiktok from '../images/tiktok.png'
// import "./VideoCard.scss";



function MyVerticallyCenteredModal(props) {
  console.log(locale.stepsToUploadInstagram[props.localeData])
  const lang = props.localeData;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.socialMedia === 'Instagram'? locale.stepsToUploadInstagram[props.localeData] : locale.stepsToUploadTiktok[props.localeData]}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{locale.steps[props.localeData]}:</h4>
        <p>
          <ol>
             <li>
                <h6>{locale.downloadTheVideo[props.localeData]}</h6>
                 <Image src="/public/media/psa.jpg" alt="social media" className={`${props.baseClassName}__social-media`} fluid/>
              </li> 
              <li>
                <h6>{props.socialMedia === 'Instagram'? locale.openInsta[props.localeData] : locale.openTiktok[props.localeData]}</h6>
              </li> 
              <li>
              <h6>{locale.uploadTheVideo[props.localeData]}</h6>
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


//modal for share tab


function ShareModal(props) {
  console.log(locale.stepsToUploadInstagram[props.localeData])
  const lang = props.localeData;
  const baseClassName = "psa-video-card";
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {locale.shateTo[props.localeData]}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <ul className={`${baseClassName}__desktop-modal-ul`}>
             <li>
             <FacebookShareButton url={props.fullUrl} quote={props.description} hashtags={[`covid19`, 'saveWorld']}>
                <FacebookIcon size="35" round={true} /> share via facebook
              </FacebookShareButton>
              </li> 
              <li>
              <LinkedinShareButton url={props.fullUrl}>
                <LinkedinIcon size="35" round={true} /> share via LinkedIn
              </LinkedinShareButton>
              </li> 
              <li>
              <TwitterShareButton url={props.fullUrl} title={props.description} hashtags={[`covid19`, 'saveWorld']}>
                <TwitterIcon size="35" round={true} /> share via Twitter
              </TwitterShareButton>
              </li>
              <li>
              <TelegramShareButton title={props.description} url={props.fullUrl}>
                <TelegramIcon size="35" round={true} /> share via Telegram
              </TelegramShareButton>
              </li>
              <li>
              <WhatsappShareButton url={props.fullUrl} title={props.description} separator={`:-`}>
                <WhatsappIcon size="35" round={true} /> share via Whatsapp
              </WhatsappShareButton>
              </li>
              <li>
              <EmailShareButton url={props.fullUrl} subject={`Share awareness for covid-19`} body={props.description} separator=':-'>
                <EmailIcon size="35" round={true} /> share via Email
              </EmailShareButton>
              </li>
              <li>
              <button className={`${baseClassName}__social-button`} onClick={() => props.setModalShow(true, 'Instagram')}>
                <img src="/public/media/insta.png" alt="tiktok" className={`${baseClassName}__social-image`}/>
              </button>
               share via Instagram
              </li>
              <li>
              <button className={`${baseClassName}__social-button`} onClick={() => {navigator.clipboard.writeText(fullUrl)}}>
                <img src="/public/media/kindpng_3410172.png" alt="tiktok" className={`${baseClassName}__social-image`}/>
              </button>
               share via Tiktok
              </li>
              <li>
              <button className={`${baseClassName}__social-button`} onClick={()=>props.downloadFile()}>
                <img src="/public/media/save-icon.png" alt="tiktok" className={`${baseClassName}__social-image`}/>
              </button>
               Download video
              </li>
              <li>
              <button className={`${baseClassName}__social-button`} onClick={() => {navigator.clipboard.writeText(props.fullUrl)}}>
                <img src="/public/media/kindpng_3410172.png" alt="tiktok" className={`${baseClassName}__social-image`}/> 
              </button>
               Copy url
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
      modalShow: false,
      socialMedia: '',
     localeData: window.location.search.split("=")[1] || 'en',
     playing: false,
     shareModalShow: false
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

setShareModalShow = (value) => {
  this.setState({shareModalShow: value})
}

onPlayClick = () => {
  this.setState({playing: !this.state.playing});
  var vid = document.getElementById("myVideo");
  if(!this.state.playing) 
    vid.play();
  else vid.pause();
}
  render() {
    const { url, name, date, videoLibrary, videoUrl, fullUrl, description } = this.props;
    const {localeData} = this.state
    // console.log(fullUrl);
    const baseClassName = "psa-video-card";
    const {modalShow, socialMedia, shareModalShow} = this.state;
    // console.log(window.location.search.split("=")[1])
    // const localeData = localStorage.getItem("language") || 'en';
  //  console.log(locale);
  //  console.log(localeData)


  console.log(window.screen.width)
    return (
      <div className={`${baseClassName}`}>
        <div className={`${baseClassName}__video-div`}>

            {
                videoLibrary && <ResponsiveEmbed aspectRatio={window.screen.width > 648 ? "16by9":"1by1"}>
                    <iframe src={videoUrl}>
                    </iframe>
                    </ResponsiveEmbed>
            }
            {
                !videoLibrary &&  <ResponsiveEmbed aspectRatio={window.screen.width > 648 ? "16by9":"1by1"}>
                <video controls className={`${baseClassName}__video-tag`} controls={false} id="myVideo">
                        <source src={url} type="video/mp4" media="screen and (min-device-width:401px)"/>
                        {/* <source src="movie.ogg" type="video/ogg" /> */}
                        Your browser does not support the video tag.
                    </video>
                 </ResponsiveEmbed>
            }

            <div className={`${baseClassName}__title-date-div`}>
              <div onClick={()=>this.onPlayClick()} >
                {!this.state.playing && <img src="/public/media/play.svg" alt="play" style={{cursor: 'pointer'}}/>}
                {this.state.playing && <p style={{fontSize: '20px', cursor: 'pointer'}}>&#9614;&#9614;</p>}
              </div>
              <div className={`${baseClassName}__name`} onClick={() => this.redirectToSingleVideo()}>
              <h1 className={`${baseClassName}__video-ui-header`}>{name}</h1>
              </div>
              <div className={`${baseClassName}__date`}>
                <Moment format="dddd, MMMM D, YYYY hh:mm A" withTitle>{date}</Moment>
                </div>
                <div className={`${baseClassName}__desktop-share-div`}>
                  <hr className={`${baseClassName}__horizontal-line--desktop`} />
                  <div className={`${baseClassName}__share-desktop`}>
                      <Button onClick={()=>this.setShareModalShow(true)} className={`${baseClassName}__share-desktop-text`} style={{backgroundColor: 'transparent', border: 'none', outline: 'none'}}><img src="/public/media/share-icon-white.svg"/> {locale.shareText[localeData]}</Button>
                  </div>
                </div>
            </div>

        </div>
        <div className={`${baseClassName}__sharing-mobile`}>
        <InputGroup className="mb-3">
            {/* <FormControl
              placeholder={fullUrl}
              aria-label="Page Url"
              value={fullUrl}
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
          <Button variant="outline-secondary" className={`${baseClassName}__button-share-url`} onClick={() => {navigator.clipboard.writeText(fullUrl)}} style={{color: 'white'}}>{locale.copyPageUrl[localeData]}</Button>
            </InputGroup.Append> */}
          </InputGroup>
          
        </div>
        <p className={`${baseClassName}__share-text`}>Share to</p>
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
        <hr className={`${baseClassName}__horizontal-line`}/>
        <div className={`${baseClassName}__share`}>
          <button className={`${baseClassName}__social-button`} onClick={()=>this.downloadFile()}>
            <img src="/public/media/save-icon.png" alt="tiktok" className={`${baseClassName}__social-image`}/>
          </button>
          <button className={`${baseClassName}__social-button`} onClick={() => {navigator.clipboard.writeText(fullUrl)}}>
            <img src="/public/media/kindpng_3410172.png" alt="tiktok" className={`${baseClassName}__social-image`}/>
          </button>
        </div>
        {/* <div className={`${baseClassName}__download`}>
            <Button onClick={()=>this.downloadFile()} className={`${baseClassName}__download-button`} style={{backgroundColor: 'transparent'}}><FaDownload color={"white"} text="Download"/> {locale.downloadVideo[localeData]}</Button>
        </div> */}
        </div>
        {/* <div
          className={`${baseClassName}__name`}
          onClick={() => this.redirectToSingleVideo()}
        >
          <h3>{name}</h3>
        </div> */}
        {/* <div className={`${baseClassName}__date`}>
         <Moment format="dddd, MMMM D, YYYY hh:mm A" withTitle>{date}</Moment>
        </div> */}
        
        
        <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => this.setModalShow(false)}
        socialMedia={this.state.socialMedia}
        baseClassName={baseClassName}
        localeData={localeData}
      />
      <ShareModal
        show={shareModalShow}
        onHide={() => this.setShareModalShow(false)}
        socialMedia={this.state.socialMedia}
        baseClassName={baseClassName}
        localeData={localeData}
        setModalShow={this.setModalShow}
        description={description}
        fullUrl={fullUrl}
        downloadFile={this.downloadFile}
      />
      </div>
    );
  }
}

VideoCard.propTypes = {};

export default VideoCard;
