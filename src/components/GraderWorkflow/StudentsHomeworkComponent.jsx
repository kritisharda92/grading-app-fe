import React from 'react';
import Header from '../HeaderComponent/HeaderComponent';
import SubHeader from '../SubHeaderComponent/SubHeaderComponent';
import { Form } from 'react-bootstrap';
import axios from 'axios'; 
import './GradeHomeworkComponent.scss';

class GradeHomeworkComponent extends React.Component {
    constructor(props) {
        super(props);

        let curHw = props.history.location.state.homework;
        this.state = {
            currentHomework: curHw
        }
    }

    UNSAFE_componentWillMount() {
        // set all states here
        axios.get('http://localhost:8080/getHomeworkSubmissions?homeworkName='+this.state.currentHomework)
        .then((response) => {
            // this.setState({ problems: response.data });
            console.log(response.data)
        });
    }

    render() {

        return (
          <div className='grader-container'>
              <Header />
              <SubHeader user="Grader"/>
              <h2 className="grader-heading">Grading - {this.state.currentHomework}</h2>
              <div className="grader-form">
                
              </div>
          </div>
        );
    }
}

  export default GradeHomeworkComponent;