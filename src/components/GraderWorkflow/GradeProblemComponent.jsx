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
            testCasePassed: false
        }

        this.marksUpdate = this.marksUpdate.bind(this);
        this.feedbackUpdate = this.feedbackUpdate.bind(this);
        this.handleSubmitMarks = this.handleSubmitMarks.bind(this);
    }

    UNSAFE_componentWillMount() {
        axios.get('http://localhost:8080/getSubmissionFiles?homeworkName='+ this.state.homework +
        '&questionName='+ this.state.problem +'&userName='+ this.state.username)
        .then((response) => {
            this.setState ({
                errorOutput: response.data.result.errorOutput,
                expectedOutput: response.data.result.expectedOutput,
                studentOutput: response.data.result.studentOutput,
                status: response.data.result.status,
                testCasePassed: response.data.result.testCasePassed
            })
        });
    }

    handleSubmitMarks(){
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

              <div className="student-submission-form">
                <div> Username : <span className="info-name">{this.state.username}</span></div>
                <div> Homework : <span className="info-name">{this.state.homework}</span></div>
                <div> Problem : <span className="info-name">{this.state.problem}</span></div> <br />
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
                    <Form.Control type="text" name="marks" onChange={this.marksUpdate} placeholder="Enter student marks" />
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