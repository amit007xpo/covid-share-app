import React, { Component } from "react";
import {Navbar} from 'react-bootstrap'
// import "./NavigationBar.scss";
import locale from "../localize.json";
class NavigationBar extends Component {
  static defaultProps = {
    shouldDisplayMenu: true
  };

  constructor(props) {
    super(props);
    this.state = {
      localeData: localStorage.getItem("language") || 'en'
    };
  }

  goBackBtn = (e) => {
    window.history.go(-1);
    e.preventDefault();
  };

  logOut = () => {
    this.props.logout();
  };

  render() {
    const baseClassName = "psa-navigation-bar";
    const { avatar, userName } = this.props;

    const userProfile = (
      <div className={`${baseClassName}__user`}>
        <span className={`${baseClassName}__avatar-span`}>
          <img
            src={avatar}
            className={`${baseClassName}__avatar`}
            alt="avatar"
          />
        </span>
        <span className={`${baseClassName}__username`}>Hi, {userName}</span>
        <span>
          <a
            href={process.env.REACT_APP_LINK_REDIRECT_UNAUTHORIZED}
            onClick={() => this.logOut()}
          >
            Logout
          </a>
        </span>
      </div>
    );
    const {localeData} = this.state;
    return (
    <Navbar collapseOnSelect expand="lg" sticky="top" style={{backgroundColor:'black', color: 'white'}}>
        <Navbar.Brand href="#" onClick={this.goBackBtn} style={{color: 'black', backgroundColor: 'white', padding: '0 1rem'}}>{locale.back[localeData]}</Navbar.Brand>
    </Navbar>
    );
  }
}

NavigationBar.propTypes = {};

export default NavigationBar;
