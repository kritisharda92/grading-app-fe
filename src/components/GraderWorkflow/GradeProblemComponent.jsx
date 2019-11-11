import React from 'react';
import Header from '../HeaderComponent/HeaderComponent';
import SubHeader from '../SubHeaderComponent/SubHeaderComponent';
import './GradeProblemComponent.scss';

class GradeProblemComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }

    }

    render() {
        var yourOutput="";
        var expectedOutput="";
        return (
          <div className='student-code-container'>
              <Header />
              < SubHeader user="Student"/>
              <h2 className="student-heading">Submission Details</h2>

              <div className="student-submission-form">
                <div className="success-message">
                    The code for <span className="problem-name">{this.state.problem}, {this.state.homework}</span> was submitted successfully!
                </div>  <br/>
                <div> Your Output : </div>
                <div className="display-box"> { yourOutput } </div> <br/> 
                <div> Expected Output :</div>
                <div className="display-box">  { expectedOutput } </div> <br/>
                <div> 
                    Test Case : <span className={"test-case-"+this.state.testCasePassed}> 
                        {this.state.testCasePassed === true ? "PASSED" : "FAILED"} 
                    </span> <br/>
                </div> 
                <div className="button-wrapper" >
                    <input className="submit-button" type="button" onClick={this.handleAnotherProblem} value="Submit another problem" />
                    <input className="submit-button" type="button" onClick={this.handleLogout} value="Logout" />
                </div>
              </div>
          </div>
        );
    }
}

export default GradeProblemComponent;