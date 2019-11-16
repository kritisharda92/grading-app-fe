import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import WelcomeScreenPage from '../components/WelcomeScreen/WelcomeScreenComponent';
import StudentPage from '../components/StudentWorkflow/SelectHomeworkComponent';
import ProfessorPage from '../components/ProfessorWorkflow/UploadHomeworkComponent';
import GraderPage from '../components/GraderWorkflow/GradeHomeworkComponent';
import ProfessorConfirmation from '../components/ProfessorWorkflow/ProfessorConfirmationComponent';
import UploadCodePage from '../components/StudentWorkflow/UploadCodeComponent';
import StudentSubmissionComponent from '../components/StudentWorkflow/StudentSubmissionComponent';
import StudentsHomeworkComponent from '../components/GraderWorkflow/StudentsHomeworkComponent';
import GradeProblemComponent from '../components/GraderWorkflow/GradeProblemComponent';

class Router extends Component {

  render() {
    return (
      <HashRouter>
        <Switch>
            <Route exact path="/student" component={StudentPage} />
            <Route exact path="/professor" component={ProfessorPage} />
            <Route exact path="/grader" component={GraderPage} />
            <Route exact path="/" component={WelcomeScreenPage} />
            <Route exact path="/professorConfirmation" component={ProfessorConfirmation} />
            <Route exact path="/uploadCode" component={UploadCodePage} />
            <Route exact path="/submissionDetails" component={StudentSubmissionComponent} />
            <Route exact path="/studentsHomework" component={StudentsHomeworkComponent} />
            <Route exact path="/gradeProblem" component={GradeProblemComponent} />
            <Route component={WelcomeScreenPage} />
        </Switch>
      </HashRouter>
      /* eslint-enable */
    );
  }
}

export default Router;
