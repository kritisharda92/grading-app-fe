import React from 'react';
import Header from '../HeaderComponent/HeaderComponent';
import SubHeader from '../SubHeaderComponent/SubHeaderComponent';
import './StudentSubmissionComponent.scss';

class StudentSubmissionComponent extends React.Component {
    constructor(props) {
        super(props);
        let hw = props.history.location.state.homework;
        let user = props.history.location.state.username;
        let problem = props.history.location.state.problem;
        let submissionDetails = props.history.location.state.submissionDetails;
        
        this.state = {
            homework: hw,
            username: user,
            problem: problem,
            studentOutput: submissionDetails.studentOutput,
            expectedOutput: submissionDetails.expectedOutput,
            errorOutput: submissionDetails.errorOutput,
            testCasePassed: submissionDetails.testCasePassed,
            status: submissionDetails.status
        }

        this.handleAnotherProblem = this.handleAnotherProblem.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleWriteUp = this.handleWriteUp.bind(this);

    }

    handleAnotherProblem() {
        this.props.history.push({
            pathname: '/uploadCode',
            state: { 
                homework: this.state.homework, 
                username: this.state.username,
            }
        })
    }

    handleWriteUp(e) {

        let formData = new FormData();
        formData.append("writeupFile", e.target.files[0]);
        formData.append("userName", this.state.username);
        formData.append("homeworkName", this.state.homework);

        fetch('http://localhost:8080/uploadWriteup', {
          method: 'POST',
          body: formData,
          mode: "no-cors"
        })
        .then(res => console.log(res));
        
        alert("The write-up was uploaded successfully!");
    }

    handleLogout() {
        this.props.history.push("/");
    }

    render() {


        var yourOutput = (this.state.status === 0) ? 
        
        this.state.studentOutput.split('\n').map((item,i) => {
            return <pre key={i}>{ item }</pre>
        }) 
        :     
        this.state.errorOutput.split('\n').map((item,i) => {
            if(item.includes('Main.java')) {
                item = item.substring(item.indexOf('Main.java'));
            }
            return <pre key={i}>{ item }</pre>
        })
        

        var expectedOutput = this.state.expectedOutput.split('\n').map((item,i) => {
            return <pre key={i}>{ item }</pre>
        })

        return (
          <div className='student-code-container'>
              <Header />
              <SubHeader user="Student" removeBack/>
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
                    <input className="submit-button" type="button" value="Upload Write-up" />
                    <input className="submit-button" type="button" onClick={this.handleAnotherProblem} value="Submit another problem" />
                    <input className="submit-button" type="button" onClick={this.handleLogout} value="Logout" />
                </div>
                <input onChange={this.handleWriteUp} className="dummy-button" id="myInput" type="file" />
              </div>
          </div>
        );
    }
}

export default StudentSubmissionComponent;