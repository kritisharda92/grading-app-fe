import React from 'react';
import Header from '../HeaderComponent/HeaderComponent';
import SubHeader from '../SubHeaderComponent/SubHeaderComponent';
import './ProfessorConfirmationComponent.scss';

const binderIcon = require('../../assets/Clean-Binder.png');

class UploadHomeworkComponent extends React.Component {
    constructor() {
      super();

      this.addNewProblem = this.addNewProblem.bind(this);
      this.logoutProfessor = this.logoutProfessor.bind(this);
    }

    addNewProblem() {
        this.props.history.push('/professor');
    }

    logoutProfessor() {
        this.props.history.push('/');
    }
  
    render() {
      return (
        <div className='professor-conf-container'>
            <Header />
            <SubHeader user="Professor"/>
            <h2 className="professor-conf-heading">Confirmation screen</h2>
            <img src={binderIcon} alt="confirmation" className="confirmation-image"/> 
            <div className="professor-conf-msg"> YAY! The homework was uploaded successfully</div> <br/>
            <div className="professor-conf-buttons">
                <input className="addProblem" type="button" name="addProblem" value="New Homework" onClick={this.addNewProblem}/>
                <input className="profLogout" type="button" name="profLogout" value="Logout" onClick={this.logoutProfessor}/>
            </div>
        </div>
      );
    }
  }

  export default UploadHomeworkComponent;