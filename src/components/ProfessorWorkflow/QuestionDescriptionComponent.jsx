import React from 'react';
import { Form } from 'react-bootstrap';

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
        this.handleUploadClick = this.handleUploadClick.bind(this);
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

    handleUploadClick() {
        const data = {
            problemName: this.state.problemName,
            problemDescription: this.state.problemDescription,
            test: {
                testCaseFile: this.state.testCaseFile,
                expectedOutputFile: this.state.expectedOutputFile
            }
        }
    }
    
    
    render() {

        return (
            <div className="question-description-container" id={this.state.id}>
                Problem Name: <input type="text" name="problemName" onChange={this.problemNameUpdate} /> <br/>
                Problem Decription: <input type="text" name="problemDescription" onChange={this.problemDescription} /> <br/>
                Text Case File: <input type="file" name="textCases" onChange={this.testCase} /> <br/>
                Expected Output File: <input type="file" name="outputFile" onChange={this.expectedOutput} /> <br/>
                {/* <button onClick="this.handleUploadClick">Upload</button> */}
            </div>
          );

        // return (
        //   <div className="question-description-container" id={this.state.id}>
        //       Problem Name: <input type="text" name="problemName" onChange={this.problemNameUpdate} /> <br/>
        //       Problem Decription: <input type="text" name="problemDescription" onChange={this.problemDescription} /> <br/>
        //       Text Case File: <input type="file" name="textCases" onChange={this.testCase} /> <br/>
        //       Expected Output File: <input type="file" name="outputFile" onChange={this.expectedOutput} /> <br/>
        //   </div>
        // );
    }
}

  export default QuestionDecriptionComponent;