import React from 'react';
import Input from './Input';
import Listing from './Listing';

export default class ShortedURLs extends React.Component {

    constructor(props) {
        super(props);
        let urls = props['urls']
        this.state = {
            urls: urls
        }
    }


    render(){
        let urls = this.state['urls'];
        return (
            <div>
                <Input />
                <Listing urls={urls}/>
            </div>
        );
    }
}