import React from 'react';
import ShortedURLs from './components/ShortedURLs';
import './App.css';

class App extends React.Component{

  constructor(props) {
    super(props);
    let urls = [];

    this.state = {
      urls: urls
    }

    this.fetchURLs = this.fetchURLs.bind(this);
  }

  fetchURLs(){
    fetch('http://127.0.0.1:5000/', {
      'mode': 'cors',
      'headers': {
        'Access-Control-Allow-Origin': '*',
      },
      crossDomain: true,
    })
        .then(response => response.json())
        .then(data => this.setState({ urls: data }));
  }

  componentDidMount() {
    this.fetchURLs();
  }

  render(){
    let urls = this.state['urls'];
    return (
        <ShortedURLs urls={urls} refreshAction={this.fetchURLs} />
    );
  }

}

export default App;
