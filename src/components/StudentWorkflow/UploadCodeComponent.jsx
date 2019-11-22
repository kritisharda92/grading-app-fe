import React from 'react';
import Header from '../HeaderComponent/HeaderComponent';
import SubHeader from '../SubHeaderComponent/SubHeaderComponent';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import './UploadCodeComponent.scss';
import config from '../../config/config';

const url = `${config.constants.URL}`;

class UploadCodeComponent extends React.Component {
    constructor(props) {
        super(props);
        let hw = props.history.location.state.homework;
        let user = props.history.location.state.username;

        this.state = {
            problems: [],
            currentProblem: '', 
            currentHomework: hw,
            currentLanguage: '',
            username: user,
            code: '',
            languages: ['Java', 'Python']
        }
        this.handleCurrentProblem = this.handleCurrentProblem.bind(this);
        this.handleUploadCode = this.handleUploadCode.bind(this);
        this.handleCodeFile = this.handleCodeFile.bind(this);
        this.handleCurrentLanguage = this.handleCurrentLanguage.bind(this);
    }

    UNSAFE_componentWillMount() {
        axios.get(`${url}findProblem?homeworkName=${this.state.currentHomework}`)
        .then((response) => {
            this.setState({ problems: response.data });
        });
    }

    handleCurrentProblem(e) {
        this.setState({currentProblem: e.target.value});
    }

    handleCurrentLanguage(e) {
        this.setState({ currentLanguage: e.target.value});
    }

    handleUploadCode() {

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

        var formData = new FormData();
        formData.append("sourceCode",this.state.code);
        formData.append("userName", this.state.username);
        formData.append("homeworkName", this.state.currentHomework);
        formData.append("questionName", this.state.currentProblem);

        // API call to upload code for a problem
        axios.post(`${url}submitHomework`,formData)
        .then(response => {
            this.setState({ submissionDetails : response.data })

            this.props.history.push({
                pathname: '/submissionDetails',
                state: { 
                    homework: this.state.currentHomework, 
                    username: this.state.username,
                    problem: this.state.currentProblem,
                    submissionDetails: this.state.submissionDetails
                }
            })
        });
    }

    handleCodeFile(e) {
        this.setState({code: e.target.files[0]});
    }

    render() {
        let prob = this.state.problems;
        let probList = prob.length > 0
		&& prob.map((item, i) => {
		return (
			<option key={i} value={item}>{item}</option>
        )}, this);
    
        return (
          <div className='student-code-container'>
              <Header />
              <SubHeader user="Student" intermediate/>
              <h2 className="student-heading">Select Problem</h2>

              <div className="professor-form" id="form-validate">
                <Form.Group controlId="formProblemName">
                    <Form.Label>Problem Name</Form.Label>
                    <Form.Control required as="select" name="selectProblem" onChange={this.handleCurrentProblem} defaultValue ="" >
                        <option value="" disabled hidden> Select a problem </option>
                        {probList}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formCodeFile">
                    <Form.Label>Upload Code</Form.Label>
                    <Form.Control required type="file" name="outputFile" onChange={this.handleCodeFile} placeholder="Upload the code file" />
                </Form.Group>

                <div className="button-wrapper" >
                    <input className="submit-button" type="button" value="Upload Code" onClick={this.handleUploadCode}/>
                </div>
              </div>
          </div>
        );
    }
}

  export default UploadCodeComponent;