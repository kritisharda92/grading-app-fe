import React from 'react';
import Header from '../HeaderComponent/HeaderComponent';
import SubHeader from '../SubHeaderComponent/SubHeaderComponent';
import './GradeHomeworkComponent.scss';

class GradeHomeworkComponent extends React.Component {
    constructor() {
        super();
    }
    
    
    render() {
        return (
          <div className='grader-container'>
              <Header />
              <SubHeader user="Grader"/>
              {/* <h1>Welcome Grader!</h1> */}
          </div>
        );
    }
}

  export default GradeHomeworkComponent;