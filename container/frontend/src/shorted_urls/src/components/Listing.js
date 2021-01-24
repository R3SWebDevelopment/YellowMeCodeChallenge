import React from 'react';
import './Style.css';

export default class Listing extends React.Component {

    constructor(props) {
        super(props);
        let urls = props['urls'];
        let previewURL = "https://joshcroyle.com/wp-content/uploads/2019/01/Logo-Menu.png";
        this.state = {
            urls: urls,
            previewURL: previewURL,
        }
        this.displayPreview = this.displayPreview.bind(this);
    }

    displayPreview(e){
        e.preventDefault();
        let previewURL = e.target.href;
        this.setState(
            {
                previewURL: previewURL
            }
        );
    }

    render(){
        let urls = this.props['urls'];
        let previewURL = this.state['previewURL'];
        return (
            <div id="listing">
                <div id="urls">
                    <div id="title">
                        <h3>
                            Shorted URLs
                        </h3>
                    </div>
                    <div id="list">
                        <ul>
                        {
                            urls.map(
                                (item, index) => (
                                    <li id={index} key={index}>
                                        {item.name} - <a href={item.url} target={"_blank"}>{item.url}</a>
                                    </li>
                                )
                            )
                        }
                        </ul>
                    </div>
                </div>
                <div id="preview">
                    <div id="title">
                        <h3>
                            Preview
                        </h3>
                    </div>
                    <div id="view">
                        <iframe id="preview-iframe" src={previewURL} width="95%" height="300px" />
                    </div>
                </div>
            </div>
        );
    }
}