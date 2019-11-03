import React, { Component } from 'react';
import { HashRouter, Route, BrowserRouter } from 'react-router-dom';
import WelcomeScreenPage from '../components/WelcomeScreen/WelcomeScreenComponent';
import StudentPage from '../components/StudentWorkflow/UploadSolutionComponent';
import ProfessorPage from '../components/ProfessorWorkflow/UploadHomeworkComponent';
import GraderPage from '../components/GraderWorkflow/GradeHomeworkComponent';
import ProfessorConfirmation from '../components/ProfessorWorkflow/ProfessorConfirmationComponent';

class Router extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HashRouter>
        <div>
            <Route exact path="/student" component={StudentPage} />
            <Route exact path="/professor" component={ProfessorPage} />
            <Route exact path="/grader" component={GraderPage} />
            <Route exact path="/" component={WelcomeScreenPage} />
            <Route exact path="/professorConfirmation" component={ProfessorConfirmation} />
        </div>
      </HashRouter>
      /* eslint-enable */
    );
  }
}

export default Router;
