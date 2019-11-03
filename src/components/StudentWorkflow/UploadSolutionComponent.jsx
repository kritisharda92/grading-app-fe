import React from 'react';
import Header from '../HeaderComponent/HeaderComponent';
import SubHeader from '../SubHeaderComponent/SubHeaderComponent';
import './UploadSolutionComponent.scss';

class UploadSolutionComponent extends React.Component {
    constructor() {
        super();
        console.log(this);
    }
    
    
    render() {
        return (
          <div className='student-container'>
              <Header />
              < SubHeader user="Student"/>
              {/* <h1>Welcome Student!</h1> */}
          </div>
        );
    }
}

  export default UploadSolutionComponent;