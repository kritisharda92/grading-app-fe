import React from 'react';
import { withRouter } from 'react-router-dom';
import './SubHeaderComponent.scss';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.url = "/";
        if(this.props.user === "Student" && this.props.intermediate)
            this.url = "/student";
        else if(this.props.user === "Grader" && this.props.intermediate)
            this.url = "/grader";
        else if(this.props.user === "Grader" && this.props.marksUpload)
            this.url = "/studentsHomework";
        this.handleBack = this.handleBack.bind(this);
    }

    handleBack() {
        // this.props.history.goBack();
        if(this.props.marksUpload) {
            this.props.history.push({
                pathname: this.url,
                state: { 
                    homework: this.props.homework, 
                }
              })
        }
        else 
            this.props.history.push(this.url);

    }

    render() {
        var backButton = this.props.removeBack ? 
        '' : <input type="button" className="subheader-back" onClick={this.handleBack} value="< Back"/>
        return(
            <div className="sub-header-text">  
                {backButton}
                <span className="subheader-welcome">Welcome {this.props.user}!</span>
            </div>
        );
    }

}

export default withRouter(Header);
