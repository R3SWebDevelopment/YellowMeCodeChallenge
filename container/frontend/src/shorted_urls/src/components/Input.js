import React from 'react';
import './Style.css';

export default class Input extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            url: "",
            name: "",
            urls: ""
        }

        this.submitURL = this.submitURL.bind(this);
        this.submitURLs = this.submitURLs.bind(this);
        this.submitURLsFile = this.submitURLsFile.bind(this);
        this.inputURL = this.inputURL.bind(this);
        this.inputName = this.inputName.bind(this);
        this.inputURLs = this.inputURLs.bind(this);
        this.refreshList = this.refreshList.bind(this);
    }

    submitURLsFile(e){
        e.preventDefault();
        let file = e.target.files[0];
        let textType = /text.*/
        if (file.type.match(textType)) {
            let reader = new FileReader();

            reader.onload = function(e) {
                let content = reader.result;
                this.setState(
                    {
                        urls: content
                    }
                );
            }.bind(this)

            reader.readAsText(file);
        }
    }

    submitURL(e){
        e.preventDefault();
        let url = this.state['url'];
        let name = this.state['name'];
        let data = {
            url: url,
            name: name
        }
        fetch('http://127.0.0.1:5000/', {
            'mode': 'cors',
            method: 'POST',
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            crossDomain: true,
            body: JSON.stringify(data)
        })
            .then(response => this.refreshList());
    }

    submitURLs(e){
        e.preventDefault();
        let urls = this.state['urls'];
        let url_list = [];
        urls.split("\n").forEach(
            row => {
                let columns = row.split(",");
                if(columns.length >= 2){
                    url_list.push(
                        {
                            name: columns[0].trim(),
                            url: columns[1].trim(),
                        }
                    );
                }
            }
        );

        let data = {
            urls: url_list
        }
        fetch('http://127.0.0.1:5000/', {
            'mode': 'cors',
            method: 'POST',
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            crossDomain: true,
            body: JSON.stringify(data)
        })
            .then(response => this.refreshList());
    }

    refreshList(){
        this.setState(
            {
                url: "",
                name: "",
                urls: ""
            }
        );
        this.props['refreshAction']();
    }

    inputURL(e){
        this.setState(
            {
                url: e.target.value
            }
        );
    }

    inputURLs(e){
        this.setState(
            {
                urls: e.target.value
            }
        );
    }

    inputName(e){
        this.setState(
            {
                name: e.target.value
            }
        );
    }

    render(){
        let url = this.state['url'];
        let name = this.state['name'];
        return (
            <div id="input">
                <div id="title">
                    <h3>
                        Short URL
                    </h3>
                </div>
                <div id="forms">
                    <div className="form">
                        <form onSubmit={this.submitURL}>
                            <label htmlFor="name">Name:</label><br/>
                            <input type="text" id="name" name="name" onChange={this.inputName} value={name} /><br/>
                            <label htmlFor="url">URL:</label><br/>
                            <input type="url" id="url" name="url" onChange={this.inputURL} value={url} /><br/>
                            <input type="submit"/><br/>
                        </form>
                    </div>
                    <div className="form">
                        <form onSubmit={this.submitURLs}>
                            <label htmlFor="urls">URLs:</label><br />
                            <textarea name="urls" id="urls" rows="5" cols="30" onChange={this.inputURLs}></textarea><br />
                            <input type="submit"/><br />
                        </form>
                    </div>
                    <div className="form">
                        <form onSubmit={this.submitURLs}>
                            <label htmlFor="url">URL:</label><br />
                            <input type="file" onChange={this.submitURLsFile}/><br />
                            <input type="submit"/><br />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}