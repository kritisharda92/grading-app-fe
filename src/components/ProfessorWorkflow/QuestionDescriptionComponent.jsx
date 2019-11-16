import React from 'react';
import { Form } from 'react-bootstrap';
import './QuestionDescriptionComponent.scss';

class QuestionDecriptionComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            problemName: '',
            problemDescription: '',
            testCaseFile: '',
            expectedOutputFile: ''
        }

        this.problemNameUpdate = this.problemNameUpdate.bind(this);
        this.problemDescription = this.problemDescription.bind(this);
        this.testCase = this.testCase.bind(this);
        this.expectedOutput = this.expectedOutput.bind(this);
    }
    
    problemNameUpdate(e) {
        this.setState({ problemName: e.target.value });
    }

    problemDescription(e) {
        this.setState({ problemDescription: e.target.value });    
    }

    testCase(e) {
        this.setState({ testCaseFile: e.target.value });    
    }

    expectedOutput(e) {
        this.setState({ expectedOutputFile: e.target.value });
    }
    
    
    render() {
        return (
            <div className="question-description-container" id={this.state.id}>
                <Form.Group controlId="formProblemName">
                    <Form.Label>Problem Name</Form.Label>
                    <Form.Control required type="text" name="problemName" onChange={this.problemNameUpdate} placeholder="Enter problem name" />
                </Form.Group>
                <Form.Group controlId="formProblemDescription">
                    <Form.Label>Problem Decription</Form.Label>
                    <Form.Control required as="textarea" name="problemDescription" onChange={this.problemDescription} placeholder="Enter problem description" />
                </Form.Group>
                <Form.Group controlId="formTestCase">
                    <Form.Label>Test Case File</Form.Label>
                    <Form.Control required type="file" name="textCases" onChange={this.testCase} placeholder="Upload the test case file" />
                </Form.Group>
                <Form.Group controlId="formExpectedOutput">
                    <Form.Label>Expected Output File</Form.Label>
                    <Form.Control required type="file" name="outputFile" onChange={this.expectedOutput} placeholder="Upload the expected output file" />
                </Form.Group>
            </div>

        );
    }
}

  export default QuestionDecriptionComponent;