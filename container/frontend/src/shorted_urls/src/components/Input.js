import React from 'react';
import './Style.css';

export default class Input extends React.Component {

    render(){
        return (
            <div id="input">
                <div id="title">
                    <h3>
                        Short URL
                    </h3>
                </div>
                <div id="forms">
                    <div className="form">
                        <form>
                            <label htmlFor="url">URL:</label><br/>
                            <input type="url" id="url" name="url" /><br/>
                            <input type="submit"/><br/>
                        </form>
                    </div>
                    <div className="form">
                        <form>
                            <label htmlFor="url">URL:</label><br />
                            <textarea name="message" rows="5" cols="30"></textarea><br />
                            <input type="submit"/><br />
                        </form>
                    </div>
                    <div className="form">
                        <form>
                            <label htmlFor="url">URL:</label><br />
                            <input type="file"/><br />
                            <input type="submit"/><br />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}