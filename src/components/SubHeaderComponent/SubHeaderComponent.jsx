import React from 'react';
import { withRouter } from 'react-router-dom';
import './SubHeaderComponent.scss';

const backArrow = '<';
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this);
    }

    handleBack() {
        this.props.history.goBack();
    }

    render() {
        return(
            <div className="sub-header-text">  
                <input type="button" className="subheader-back" onClick={this.handleBack} value="< Back"/>
                <span className="subheader-welcome">Welcome {this.props.user}!</span>
            </div>
        );
    }

}

export default withRouter(Header);
