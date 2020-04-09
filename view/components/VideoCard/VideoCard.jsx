var React = require("react");
var axios = require('axios');
const https = require('https');
const fs = require('fs');
const Blob = require("cross-blob");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

import Moment from 'react-moment'
import {
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
  constructor(props){
    super(props);
  }

  render() {
    const { url, name, date, fullUrl, urlDownLoad, outputVideoId } = this.props;
    const baseClassName = "psa-video-card";
    
    return (
      <div className={`${baseClassName}`}>
        <div className={`${baseClassName}__video-div`}>
          <video width="320" height="240" controls>
            <source src={url} type="video/mp4" />
            {/* <source src="movie.ogg" type="video/ogg" /> */}
            Your browser does not support the video tag.
          </video>
        </div>
        <div className={`${baseClassName}__video-title`}>
          {name}
        </div>
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
            <a href='/download/video' download={outputVideoId}><FaDownload color={"white"}/></a>
        </div>
      </div>
    );
  }
}

VideoCard.propTypes = {};

module.exports = VideoCard;
