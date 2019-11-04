import React from 'react';
import Header from '../HeaderComponent/HeaderComponent';
import SubHeader from '../SubHeaderComponent/SubHeaderComponent';
import './UploadCodeComponent.scss';

class UploadCodeComponent extends React.Component {
    constructor(props) {
        super(props);
        let hw = props.history.location.state.homework;
        let user = props.history.location.state.username;
        this.state = {
            problems: ["problem-1","problem-2","problem-3"],
            currentProblem: '', 
            currentHomework: hw,
            username: user,
            code: ''
        }
        this.handleCurrentProblem = this.handleCurrentProblem.bind(this);
        this.handleUploadCode = this.handleUploadCode.bind(this);
        this.handleCodeFile = this.handleCodeFile.bind(this);
    }

    handleCurrentProblem(e) {
        this.setState({currentProblem: e.target.value});
    }

    handleUploadCode() {
        // console.log(this.state);
        var formData = new FormData();
        formData.append("sourceCode",this.state.code);
        formData.append("userName", this.state.username);
        formData.append("homeworkName", this.state.currentHomework);
        formData.append("questionName", this.state.currentProblem);

        console.log(this.state);
        // API call to upload code for a problem
        fetch('http://localhost:8080/submitHomework', {
          method: 'POST',
          body: formData,
          mode: "no-cors"
        });

        this.props.history.push("/");

    }

    handleCodeFile(e) {
        this.setState({code: e.target.files[0]});
    }

    render() {
        let prob = this.state.problems;
        let probList = prob.length > 0
		&& prob.map((item, i) => {
		return (
			<option key={i} value={item}>{item}</option>
        )}, this);
    
        return (
          <div className='student-code-container'>
              <Header />
              < SubHeader user="Student"/>
              <h2>Select Homework</h2>
              <div>
                  {/* RIT Username: <input type="text" onChange={this.handleUsername}/> <br/> <br/> */}
                  Problem Name: <select onChange={this.handleCurrentProblem} defaultValue="none"> 
                  <option value="none" disabled hidden> Select a problem </option>
                  {probList} 
                  </select> <br/> <br/>
                  Upload Code: <input type="file" onChange={this.handleCodeFile}/>
                  {/* <input type="button" value="Upload Write-up" /> */}
                  <input type="button" value="Upload Code" onClick={this.handleUploadCode}/>
              </div>
          </div>
        );
    }
}

  export default UploadCodeComponent;