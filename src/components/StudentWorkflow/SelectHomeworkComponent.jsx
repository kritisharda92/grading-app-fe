import React from 'react';
import Header from '../HeaderComponent/HeaderComponent';
import SubHeader from '../SubHeaderComponent/SubHeaderComponent';
import './SelectHomeworkComponent.scss';

class SelectHomeworkComponent extends React.Component {
    constructor() {
        super();
        
        this.state = {
            homeworks: ["Homework-1", "Homework-2", "Homework-3"],
            currentHomework: '',
            username: ''
        }

        this.handleUsername = this.handleUsername.bind(this);
        this.handleCurrentHomework = this.handleCurrentHomework.bind(this);
        this.handleUploadCode = this.handleUploadCode.bind(this);
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
        console.log(this.state);
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