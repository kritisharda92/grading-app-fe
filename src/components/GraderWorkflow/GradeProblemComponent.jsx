import React from 'react';
import Header from '../HeaderComponent/HeaderComponent';
import SubHeader from '../SubHeaderComponent/SubHeaderComponent';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import './GradeProblemComponent.scss';

class GradeProblemComponent extends React.Component {
    constructor(props) {
        super(props);
        var hw = props.history.location.state.homework;
        var prob = props.history.location.state.problem;
        var user = props.history.location.state.username;

        this.state = {
            homework: hw,
            problem: prob,
            username: user,
            feedback: '',
            marks: '',
            errorOutput: '',
            expectedOutput: '',
            studentOutput: '',
            status: 1,
            codeURL: '',
            writeupURL:'',
            testCasePassed: false
        }

        this.marksUpdate = this.marksUpdate.bind(this);
        this.feedbackUpdate = this.feedbackUpdate.bind(this);
        this.handleSubmitMarks = this.handleSubmitMarks.bind(this);
        this.handleWriteupDownload = this.handleWriteupDownload.bind(this);
        this.handleCodeDownload = this.handleCodeDownload.bind(this);
    }

    UNSAFE_componentWillMount() {
        axios.get('http://localhost:8080/getSubmissionFiles?homeworkName='+ this.state.homework +
        '&questionName='+ this.state.problem +'&userName='+ this.state.username)
        .then((response) => {
            console.log(response.data);
            this.setState ({
                errorOutput: response.data.result.errorOutput,
                expectedOutput: response.data.result.expectedOutput,
                studentOutput: response.data.result.studentOutput,
                status: response.data.result.status,
                testCasePassed: response.data.result.testCasePassed,
                codeURL: response.data.homeworkFileName,
                writeupURL: response.data.writeupFileName,
            })
        });
    }

    handleWriteupDownload() {
        axios.get('http://localhost:8080/download?fileName='+this.state.writeupURL)
        .then((response) => {
            console.log(response.data);
        });
    }

    handleCodeDownload() {
        axios.get('http://localhost:8080/download?filename='+this.state.codeURL)
        .then((response) => {
            console.log(response.data);
        });
    }

    handleSubmitMarks(){
        
        let allAreFilled = true;
        document.getElementById("form-validate").querySelectorAll("[required]").forEach(function(i) {
            i.style.outline = "none";
            if (!i.value) {
            allAreFilled = false;
            i.style.outline = "1px solid red";
            }
        })
        if (!allAreFilled) {
            alert('Some required fields are missing!');
            return;
        }

        var fd = new FormData();
        fd.append("userName",this.state.username);
        fd.append("homeworkName",this.state.homework);
        fd.append("questionName",this.state.problem);
        fd.append("marks",this.state.marks);
        fd.append("feedback",this.state.feedback);

        axios.post('http://localhost:8080/submitGrades', fd)
        .then((response) => {
           console.log(response.data);
        });

        window.alert("Student marks and feedback was recorded successfully!");

        this.props.history.push({
            pathname: '/studentsHomework',
            state: { 
                homework: this.state.homework, 
            }
          })
    }

    marksUpdate(e) {
        this.setState({ marks: e.target.value });
    }

    feedbackUpdate(e) {
        this.setState({ feedback: e.target.value });
    }

    render() {
        var yourOutput;
        if(this.state.status===0){
            yourOutput = this.state.studentOutput;
        } else {
            yourOutput = this.state.errorOutput;
        }
        var expectedOutput=this.state.expectedOutput;
        return (
          <div className='student-code-container'>
              <Header />
              < SubHeader user="Student"/>
              <h2 className="student-heading">Submission Details</h2>

              <div className="student-submission-form" id="form-validate">
                <div> 
                    <div className="info-heading"> Username : </div>
                    <div className="info-value">{this.state.username}</div>
                </div>
                <div> 
                    <div className="info-heading"> Homework : </div>
                    <div className="info-value">{this.state.homework}</div>
                </div>
                <div> 
                    <div className="info-heading"> Problem : </div>
                    <div className="info-value">{this.state.problem}</div>
                </div>
                <div> 
                    <div className="info-heading"> Code File : </div>
                    <input type='button' className="info-button" onClick={this.handleCodeDownload} value="Download code file"/>
                </div>
                <div> 
                    <div className="info-heading"> Write-Up File : </div>
                    <input type='button' className="info-button" onClick={this.handleWriteupDownload} value="Download write-up file" />
                </div>

                <br/>
                <div> Your Output : </div>
                <div className="display-box"> { yourOutput } </div> <br/> 
                <div> Expected Output :</div>
                <div className="display-box">  { expectedOutput } </div> <br/>
                <div> 
                    Test Case : <span className={"test-case-"+this.state.testCasePassed}> 
                        {this.state.testCasePassed === true ? "PASSED" : "FAILED"} 
                    </span> <br/>
                </div> <br /> <br />
                <Form.Group controlId="formMarks">
                    <Form.Label>Enter marks</Form.Label>
                    <Form.Control required type="text" name="marks" onChange={this.marksUpdate} placeholder="Enter student marks" />
                </Form.Group> <br />
                <Form.Group controlId="formFeedback">
                    <Form.Label>Enter feedback</Form.Label>
                    <Form.Control as="textarea" name="feedback" onChange={this.feedbackUpdate} placeholder="Enter some feedback for the student" />
                </Form.Group>
                <div className="button-wrapper" >
                    <input className="submit-button" type="button" onClick={this.handleSubmitMarks} value="Submit" />
                </div>
              </div>
          </div>
        );
    }
}

export default GradeProblemComponent;