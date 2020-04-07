var React =  require("react");

// import "./NavigationBar.scss";

class NavigationBar extends React.Component {
  // static defaultProps = {
  //   shouldDisplayMenu: true
  // };

  constructor(props) {
    super(props);
    this.state = {};
  }

  // goBackBtn = (e) => {
  //   window.history.go(-1);
  //   e.preventDefault();
  // };

  // logOut = () => {
  //   this.props.logout();
  // };

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

    return (
      <div className={`${baseClassName}`}>
        <ul className={`${baseClassName}__nav-ul`}>
          <li>
            <a href="# " className="active" onClick={this.goBackBtn}>
              Back
            </a>
          </li>
          {/* <li>
            <a href={process.env.REACT_APP_LINK_VIDEO_LIB}>Video library</a>
          </li> */}
          <li>{userName && userProfile}</li>
        </ul>
      </div>
    );
  }
}

NavigationBar.propTypes = {};

module.exports = NavigationBar;
