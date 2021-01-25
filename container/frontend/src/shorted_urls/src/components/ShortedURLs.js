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
        let refreshAction = this.props['refreshAction'];
        return (
            <div>
                <Input refreshAction={refreshAction} />
                <Listing urls={urls}/>
            </div>
        );
    }
}