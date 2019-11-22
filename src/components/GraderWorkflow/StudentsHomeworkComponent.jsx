import React, {Fragment} from 'react';
import Header from '../HeaderComponent/HeaderComponent';
import SubHeader from '../SubHeaderComponent/SubHeaderComponent';
import { Table } from 'react-bootstrap';
import axios from 'axios'; 
import './StudentsHomeworkComponent.scss';

class StudentsHomeworkComponent extends React.Component {
    constructor(props) {
        super(props);

        let curHw = props.history.location.state.homework;
        this.state = {
            currentHomework: curHw,
            submissionDetails: []
        }
        // this.state = {
        //     currentHomework: "Homework-4",
        //     submissionDetails: [
        //         { problems: ["p1","p2","p3"], userName: "user1"},
        //         { problems: ["p1","p2","p3"], userName: "user2"},
        //         { problems: ["p1","p2","p3"], userName: "user3"},
        //         { problems: ["p1","p2","p3"], userName: "user4"},
        //         { problems: ["p1","p2","p3"], userName: "user5"},
        //         { problems: ["p1","p2","p3"], userName: "user6"},
        //         { problems: ["p1","p2","p3"], userName: "user7"},
        //         { problems: ["p1","p2","p3"], userName: "user8"},
        //         { problems: ["p1","p2","p3"], userName: "user9"}
        //     ]
        // }

        this.handleProblemClick = this.handleProblemClick.bind(this);
    }

    UNSAFE_componentWillMount() {
        // set all states here
        axios.get('http://localhost:8080/getHomeworkSubmissions?homeworkName='+this.state.currentHomework)
        .then((response) => {
            this.setState({ submissionDetails: response.data });
        });
    }

    handleProblemClick(problemName, userName) {
        this.props.history.push({
            pathname: '/gradeProblem',
            state: { 
                homework: this.state.currentHomework, 
                problem: problemName,
                username: userName
            }
        })
        
    }

    render() {
        var data = this.state.submissionDetails;
        var users = data.map((el) => { return el.userName });
        var probs = data.map ((el) => { return el.problems });
        var dates = data.map ((el) => { return el.submissionDates});
        var marks = data.map ((el) => { return el.marksList });
        console.log(probs);
        console.log(dates);

        var tableRows = users.map((item,i) => {
            var problemRows = probs[i].map((item,j)=>{
                return (
                    <Fragment key={j}>
                        <tr onClick={() => this.handleProblemClick(item,users[i])}> 
                            <td></td> 
                            <td>{item}</td>
                            <td>{dates[i][j]}</td>
                            <td>{marks[i][j] == -1 ? "Not Graded": "Graded"}</td>
                            <td>{ marks[i][j] == -1 ? "-": marks[i][j]}</td>
                        </tr>
                    </Fragment>
                )
            });

            var section = (
                <Fragment key={i}>
                    <tr className="color-orange"> 
                        <td>{i}</td> 
                        <td colSpan="4">{item}</td>
                    </tr>
                    {problemRows}
                </Fragment>
            )
            return section;     
        })

        return (
          <div className='grader-container'>
              <Header />
              <SubHeader user="Grader" intermediate />
              <h2 className="grader-heading">Grading - {this.state.currentHomework}</h2>
              <div className="grader-form-2">
              <Table bordered hover>
                <thead>
                    <tr className="color-orange">
                    <th>#</th>
                    <th>Student Submissions</th>
                    <th>Submission Date</th>
                    <th>Status</th>
                    <th>Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
                </Table>
              </div>
          </div>
        );
    }
}

  export default StudentsHomeworkComponent;