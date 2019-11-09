import React from 'react';
import Header from '../HeaderComponent/HeaderComponent';
import SubHeader from '../SubHeaderComponent/SubHeaderComponent';
import { Form } from 'react-bootstrap';
import axios from 'axios'; 
import './GradeHomeworkComponent.scss';

class GradeHomeworkComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            allHomeworks: [],
            currentHomework: ''
        }

        this.handleCurrentHomework = this.handleCurrentHomework.bind(this);
    }

    UNSAFE_componentWillMount() {
        axios.get('http://localhost:8080/findAllHomework')
        .then((response) => {
            this.setState ({ allHomeworks: response.data });
        });
    }

    handleCurrentHomework(e) {
        this.setState({currentHomework: e.target.value});
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
              <div className="grader-form">
                <Form.Group controlId="formHomeworkName">
                    <Form.Label>Homework Name</Form.Label>
                    <Form.Control as="select" name="selectHomework" onChange={this.handleCurrentHomework} defaultValue ="none" >
                        <option value="none" disabled hidden> Select a homework </option>
                        {allHWList} 
                    </Form.Control>
                </Form.Group>

                <div className="button-wrapper" >
                    <input className="submit-button" type="button" value="Upload Code"/>
                </div>
              </div>
          </div>
        );
    }
}

  export default GradeHomeworkComponent;