import React from 'react';
import ShortedURLs from './components/ShortedURLs';
import './App.css';

class App extends React.Component{

  constructor(props) {
    super(props);
    let urls = [
      {
        name: "Google",
        url: "https://www.google.com"
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com"
      },
      {
        name: "Youtube",
        url: "https://www.youtube.com"
      },
    ]

    this.state = {
      urls: urls
    }
  }

  render(){
    let urls = this.state['urls'];
    return (
        <ShortedURLs urls={urls}/>
    );
  }

}

export default App;
