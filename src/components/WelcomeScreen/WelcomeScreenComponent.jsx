import React from 'react';
import Header from '../HeaderComponent/HeaderComponent';
import './WelcomeScreenComponent.scss';

const studentIcon = require('../../assets/Lightbulb.png');
const professorIcon = require('../../assets/Math-Problem.png');
const graderIcon = require('../../assets/F-to-A-Test.png');

class WelcomeScreenComponent extends React.Component {
    constructor() {
      super();
      
    this.handleStudentClick = this.handleStudentClick.bind(this);
    this.handleProfessorClick = this.handleProfessorClick.bind(this);
    this.handleGraderClick = this.handleGraderClick.bind(this);
    }
  
    handleNameChange(e) {
        this.setState({name: e.target.value});
    }

    handleDateChange(e) {
        this.setState({date: e.target.value});
    }

    handleSubmit() {
    //   event.preventDefault();
      const data = {
          name : this.state.name,
          date : this.state.date
      };
      
      fetch(`http://localhost:8080/create?name=${this.state.name}&date=${this.state.date}`, {
        method: 'POST',
        body: data,
      });
    }

    handleStudentClick() {
        this.props.history.push('/student');
    }

    handleProfessorClick() {
        this.props.history.push('/professor');
    }

    handleGraderClick() {
        this.props.history.push('/grader');
    }

  
    render() {
      return (
        <div className="welcome-screen-container">
            <Header />
            <h1 className="welcome-message">Algorithms Grading Web Application</h1>
            <form className="form">
                <div className="student-workflow" onClick={this.handleStudentClick}>
                  <img src={studentIcon} alt="student" className="student"/>
                  <button className="welcome-button">Student</button>
                </div>

                <div className='professor-workflow' onClick={this.handleProfessorClick}>
                  <img src={professorIcon} alt="professor" className="professor"/>
                  <button className="welcome-button">Professor</button>
                </div>

                <div className='grader-workflow' onClick={this.handleGraderClick}>
                  <img src={graderIcon} alt="grader" className="grader"/>
                  <button className="welcome-button">Grader</button>
                </div>
            </form>
        </div>
      );
    }
  }

  export default WelcomeScreenComponent;