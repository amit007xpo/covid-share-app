import React from "react";
import SingleVideoShare from './SingleVideoShare';
import NavigationBar from './NavigationBar'
class App extends React.Component {
  constructor() {
    super();
    // this.handleButtonClick = this.handleButtonClick.bind(this);
    // this.handleTextChange = this.handleTextChange.bind(this);
    // this.handleReset = this.handleReset.bind(this);

    this.state = {
      name: "",
      msg: "",
      message: false
    };
  }

  //Handlers
//   handleButtonClick = e => {
//     const nameLen = this.state.name.length;
//     if (nameLen > 0) {
//       this.setState({
//         msg: `You name has ${nameLen} ${window.location} characters including space`
//       });
//     }
//   };

//   handleTextChange = e => {
//       this.setState({message: !this.state.message});
//     this.setState({ name: e.target.value });
//     alert(window.location);
//   };

//   handleReset = () => {
//       console.log('hi')
//     this.setState({ name: "", msg: "" });
//   };
  
  //End Handlers

  render() {
    console.log(this.props)
    console.log('hi'+ this.props.name);
    return (
      //do something here where there is a button that will replace the text
      <div className={`psa-app`}>
        <NavigationBar />
        <SingleVideoShare data = {this.props.data}/>
      </div>
    );
  }
}
export default App;