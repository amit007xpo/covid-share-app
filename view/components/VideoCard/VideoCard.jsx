var React = require("react");
var axios = require('axios');
const https = require('https');
const fs = require('fs');

import Moment from 'react-moment'
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

// import "./VideoCard.scss";
class VideoCard extends React.Component {
  // static defaultProps = {
  //   shouldDisplayMenu: true,
  //   userId: ''
  // };

  // redirectToSingleVideo = function(){
  //   if (this.props.redirect)
  //     this.props.history.replace(`/${this.props.userId}/videos/${this.props.psaId}`);
  // };

  constructor(props){
    super(props);
    this.downloadFile = this.downloadFile.bind(this);
  }
downloadFile(){

  // const file = fs.createWriteStream(this.props.outputVideoId);
  // const request = https.get(this.props.url, function(response) {
  //   response.pipe(file);
  // });
  var config = {
    headers: {'Access-Control-Allow-Origin': '*'}
  };
    axios({
      url: this.props.url,
      method: 'GET',
      responseType: 'blob', // important
      config
    }).then(response=>{
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = global.document.createElement('a');
      link.href = url;
      link.setAttribute('download', this.props.outputVideoId);
      document.body.appendChild(link);
      link.click();
  }).catch(err=> {
    console.log(err);
  });
 }


  render() {
    const { url, name, date, fullUrl } = this.props;
    const baseClassName = "psa-video-card";
    
    return (
      <div className={`${baseClassName}`}>
        <video width="320" height="240" controls>
          <source src={url} type="video/mp4" />
          {/* <source src="movie.ogg" type="video/ogg" /> */}
          Your browser does not support the video tag.
        </video>
        <div className={`${baseClassName}__share`}>
           <ul className="socialShareLinks">
                  <li>
                      <a className="facebook" href={`${'https://www.facebook.com/sharer.php?u=' + fullUrl}`} target="_blank" rel="nofollow" >
                         <FacebookIcon size="30" round={true} />
                      </a>
                  </li>
                  <li>
                      <a className="twitter" href={`${"https://twitter.com/intent/tweet?url="+ fullUrl}`} target="_blank" rel="nofollow">
                         <TwitterIcon size="30" round={true} />
                      </a>
                  </li>
                  <li>
                      <a className="linkedin" href={`${"https://www.linkedin.com/shareArticle?mini=true&url="+ fullUrl}`} target="_blank" rel="nofollow">
                         <LinkedinIcon size="30" round={true} />
                      </a>
                  </li>
                  <li>
                      <a className="digg" href={`${"https://web.whatsapp.com/send?text="+ fullUrl}`} target="_blank" rel="nofollow">
                        <WhatsappIcon size="30" round={true} />
                      </a>
                  </li>
                  <li>
                      <a className="telegram" href={`${"https://telegram.me/share/url?url="+ fullUrl}`} target="_blank" rel="nofollow">
                        <TelegramIcon size="30" round={true} />
                      </a>
                  </li>
                  <li>
                      <a className="mail" href={`${"mailto:?subject=Check out My video&body="+ fullUrl}`} target="_blank">
                          <EmailIcon size="30" round={true} />
                      </a>
                  </li>
              </ul>
        </div>
        <div className={`${baseClassName}__date`}>
          created on: <Moment format="dddd, MMMM D, YYYY hh:mm A" withTitle>{date}</Moment>
        </div>
        <div className={`${baseClassName}__download`}>
            {/* <button onClick={this.downloadFile()} className={`${baseClassName}__download-button`}><FaDownload color={"black"}/></button> */}
            <a download="file.mp4" href="/download/123" ><FaDownload color={"white"}/></a>
        </div>
      </div>
    );
  }
}

VideoCard.propTypes = {};

module.exports = VideoCard;
