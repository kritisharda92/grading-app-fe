import React from 'react';
import Header from '../HeaderComponent/HeaderComponent';
import SubHeader from '../SubHeaderComponent/SubHeaderComponent';
import { Form } from 'react-bootstrap';
import axios from 'axios'; 
import './GradeHomeworkComponent.scss';
import config from '../../config/config';

const url = `${config.constants.URL}`;

class GradeHomeworkComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            allHomeworks: [],
            currentHomework: '',
        }

        this.handleCurrentHomework = this.handleCurrentHomework.bind(this);
        this.handleHomeworkSubmit = this.handleHomeworkSubmit.bind(this);
    }

    UNSAFE_componentWillMount() {
        axios.get(`${url}findAllHomework`)
        .then((response) => {
            this.setState ({ allHomeworks: response.data });
        });
    }

    handleCurrentHomework(e) {
        this.setState({currentHomework: e.target.value});
    }

    handleHomeworkSubmit() {

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

        let hw = this.state.currentHomework;
        this.props.history.push({
            pathname: '/studentsHomework',
            state: { 
                homework: hw, 
            }
          })
    }

    render() {
        let hw = this.state.allHomeworks;
        let allHWList = hw.length > 0
		&& hw.map((item, i) => {
		return <option key={i} value={item}>{item}</option>
        }, this);

        return (
          <div className='grader-container'>
              <Header />
              <SubHeader user="Grader"/>
              <h2 className="grader-heading">Select a Homework to Grade</h2>
              <div className="grader-form" id="form-validate">
                <Form.Group controlId="formHomeworkName">
                    <Form.Label>Homework Name</Form.Label>
                    <Form.Control required as="select" name="selectHomework" onChange={this.handleCurrentHomework} defaultValue ="" >
                        <option value="" disabled hidden> Select a homework </option>
                        {allHWList} 
                    </Form.Control>
                </Form.Group>

                <div className="button-wrapper" >
                    <input onClick={this.handleHomeworkSubmit} className="submit-button" type="button" value="Grade Homework"/>
                </div>
              </div>
          </div>
        );
    }
}

  export default GradeHomeworkComponent;