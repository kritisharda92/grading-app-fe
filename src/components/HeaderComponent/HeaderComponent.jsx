import React from 'react';
import { withRouter } from 'react-router-dom';
import './HeaderComponent.scss';


class Header extends React.Component {
    constructor() {
        super();
        this.redirectToHome = this.redirectToHome.bind(this);
    }

    redirectToHome() {
        console.log(this);
        this.props.history.push('/');
    }

    render() {
        return(
            <div className="header-text">  
                <span className="header-rit" onClick={this.redirectToHome}> RIT </span>
                <span className="header-roc-1" onClick={this.redirectToHome}> | </span>
                <span className="header-roc" onClick={this.redirectToHome}> Rochester Institute of Technology </span>
            </div>
        );
    }

}

export default withRouter(Header);
