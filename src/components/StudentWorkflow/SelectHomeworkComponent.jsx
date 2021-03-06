import React from 'react';
import Header from '../HeaderComponent/HeaderComponent';
import SubHeader from '../SubHeaderComponent/SubHeaderComponent';
import { Form } from 'react-bootstrap';
import './SelectHomeworkComponent.scss';
import axios from 'axios';
import config from '../../config/config';

const url = `${config.constants.URL}`;

class SelectHomeworkComponent extends React.Component {
    constructor() {
        super();
        
        this.state = {
            homeworks: [],
            currentHomework: '',
            username: ''
        }

        this.handleUsername = this.handleUsername.bind(this);
        this.handleCurrentHomework = this.handleCurrentHomework.bind(this);
        this.handleUploadCode = this.handleUploadCode.bind(this);
        this.handleWriteUp = this.handleWriteUp.bind(this);
    }

    UNSAFE_componentWillMount() {
        axios.get(`${url}availableHomework`)
        .then((response) => {
            this.setState ({ homeworks: response.data });
        });
    }

    handleWriteUp(e) {

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

        let formData = new FormData();
        formData.append("writeupFile", e.target.files[0]);
        formData.append("userName", this.state.username);
        formData.append("homeworkName", this.state.currentHomework);

        fetch(`${url}uploadWriteup`, {
          method: 'POST',
          body: formData,
          mode: "no-cors"
        })
        .then(res=>console.log(res));

        alert("The write-up was uploaded successfully!");
    }

    handleUsername(e) {
        this.setState({username: e.target.value});
    }

    handleCurrentHomework(e) {
        this.setState({currentHomework: e.target.value});
    }

    handleUploadCode() {
        let allAreFilled = true;
        document.getElementById("form-validate").querySelectorAll("[required]").forEach(function(i) {
            console.log(i);
            console.log(i.value);
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

        let curHw = this.state.currentHomework;
        let user = this.state.username;
        this.props.history.push({
            pathname: '/uploadCode',
            state: { 
                homework: curHw, 
                username: user
            }
          })
    }
    
    render() {

        const hw = this.state.homeworks;

        let hwList = hw.length > 0
		&& hw.map((item, i) => {
		return (
			<option key={i} value={item}>{item}</option>
        )}, this);
    
        return (
        
            <div className='student-container'>
              <Header />
              <SubHeader user="Student"/>
              <h2 className="student-heading">Select Homework</h2>

              <div className="professor-form" id="form-validate">
                <Form.Group controlId="formUserName">
                    <Form.Label>RIT Username</Form.Label>
                    <Form.Control required className="user-name" type="text" name="userName" onChange={this.handleUsername} placeholder="Enter username" />
                </Form.Group>
                <Form.Group controlId="formHomeworkName">
                    <Form.Label>Homework Name</Form.Label>
                    <Form.Control required as="select" name="selectHomework" onChange={this.handleCurrentHomework} defaultValue ="" placeholder="Enter due date" >
                        <option value="" disabled hidden> Select a homework </option>
                        {hwList} 
                    </Form.Control>
                </Form.Group>
                <div className="button-wrapper" >
                    <input className="submit-button" type="button" value="Upload Write-up" />
                    <input className="submit-button" type="button" value="Upload Code" onClick={this.handleUploadCode}/>
                </div>
                <input onChange={this.handleWriteUp} className="dummy-button" id="myInput" type="file" />
              </div>
          </div>
        );
    }
}

  export default SelectHomeworkComponent;