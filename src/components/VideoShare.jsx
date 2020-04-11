import React from "react";
import SingleVideoShare from './SingleVideoShare';
class App extends React.Component {
  constructor() {
    super();
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.state = {
      name: "",
      msg: "",
      message: false
    };
  }

  //Handlers
  handleButtonClick = e => {
    const nameLen = this.state.name.length;
    if (nameLen > 0) {
      this.setState({
        msg: `You name has ${nameLen} ${window.location} characters including space`
      });
    }
  };

  handleTextChange = e => {
      this.setState({message: !this.state.message});
    this.setState({ name: e.target.value });
    alert(window.location);
  };

  handleReset = () => {
      console.log('hi')
    this.setState({ name: "", msg: "" });
  };
  
  //End Handlers

  render() {
    let msg;
    const {message} = this.state;
    if (this.state.msg !== "") {
      msg = <p>{this.state.msg}</p>;
    } else {
      msg = "";
    }
    console.log('hi');
    return (
      //do something here where there is a button that will replace the text
      <div>
        {/* <label>Your name </label>
        <input
          type="text"
          id="txtName"
          name="txtName"
          value={this.state.name}
          onChange={this.handleTextChange}
        />
        <button id="btnSubmit" onClick={this.handleButtonClick}>
          Calculate Name Length
        </button>
        <button id="btnReset" onClick={this.handleReset}>
          Reset All
        </button>
        <hr />
        {msg}

        {message && ('this is the message')} */}
        <SingleVideoShare />
      </div>
    );
  }
}
export default App;