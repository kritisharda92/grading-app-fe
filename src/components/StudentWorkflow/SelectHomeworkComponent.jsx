import React from 'react';
import Header from '../HeaderComponent/HeaderComponent';
import SubHeader from '../SubHeaderComponent/SubHeaderComponent';
import './SelectHomeworkComponent.scss';
import axios from 'axios';

class SelectHomeworkComponent extends React.Component {
    constructor() {
        super();
        
        this.state = {
            homeworks: [],
            currentHomework: '',
            username: ''
        }

        this.handleUsername = this.handleUsername.bind(this);
        this.handleCurrentHomework = this.handleCurrentHomework.bind(this);
        this.handleUploadCode = this.handleUploadCode.bind(this);
    }

    UNSAFE_componentWillMount() {
        axios.get('http://localhost:8080/availableHomework')
        .then((response) => {
            this.setState ({ homeworks: response.data });
        });
    }

    handleUsername(e) {
        this.setState({username: e.target.value});
    }

    handleCurrentHomework(e) {
        this.setState({currentHomework: e.target.value});
    }

    handleUploadCode() {
        let curHw = this.state.currentHomework;
        let user = this.state.username;
        this.props.history.push({
            pathname: '/uploadCode',
            state: { 
                homework: curHw, 
                username: user
            }
          })
    }
    
    render() {

        const hw = this.state.homeworks;

        let hwList = hw.length > 0
		&& hw.map((item, i) => {
		return (
			<option key={i} value={item}>{item}</option>
        )}, this);
    
        return (
          <div className='student-container'>
              <Header />
              < SubHeader user="Student"/>
              <h2>Select Homework</h2>

              {/* <div className="professor-form">
                <Form.Group controlId="formUserName">
                    <Form.Label>RIT Username</Form.Label>
                    <Form.Control className="user-name" type="text" name="userName" onChange={this.handleUsername} placeholder="Enter username" />
                </Form.Group>
                <Form.Group controlId="formHomeworkName">
                    <Form.Label>Homework Name</Form.Label>
                    <Form.Control as="select" name="selectHomework" onChange={this.handleCurrentHomework} dafaultValue ="none" placeholder="Enter due date" />
                </Form.Group>
                <QuestionDescription id={0} questionData={this.problemUpdate}/>
                {
                    this.state.problems.map((problem,index) => {
                    return (
                        <QuestionDescription key={index} id={index+1} questionData={this.problemUpdate}/>
                    )
                })
                }
                </div> */}

              <div>
                  RIT Username: <input type="text" onChange={this.handleUsername}/> <br/> <br/>
                  Homework Name: <select onChange={this.handleCurrentHomework} defaultValue="none"> 
                  <option value="none" disabled hidden> Select a homework </option>
                  {hwList} 
                  </select> <br/> <br/>
                  <input type="button" value="Upload Write-up" />
                  <input type="button" value="Upload Code" onClick={this.handleUploadCode}/>
              </div>
          </div>
        );
    }
}

  export default SelectHomeworkComponent;