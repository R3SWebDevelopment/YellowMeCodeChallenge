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


    render(props){

        let urls = this.props['urls'];
        return (
            <div>
                <Input />
                <Listing urls={urls}/>
            </div>
        );
    }
}