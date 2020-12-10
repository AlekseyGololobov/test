import React, { useState, useEffect } from 'react';
import './App.css';
import Dialog from './components/dialogs';
import Auth from './components/auth';
import { Autoschool } from './components/lic/Autoschool';
import { Exam } from './components/lic/Exam';
import { Static } from './components/statistic/Static';
type AppType = {
  showDialog:boolean;
}
class App extends React.Component<any, AppType>  {
  constructor(props:any) {
    super(props);
    this.state = {
      showDialog:true
    };
  }  
  // handleKeyDown = (e:any) => {
  //   if( e.keyCode == 32 ) { this.setState( {showDialog: !this.state.showDialog} ) ; console.log("show"); }
  // }
  // componentDidMount = () => {
  //   document.addEventListener('keyup', this.handleKeyDown);
  // }
  render() {
      return (
      <div className="App">
        {this.state.showDialog ? <Dialog/> : null }
        <Auth/>
        <Static/>
      </div>
    );
  }
}

export default App;
