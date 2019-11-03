import React from 'react';
import QuestionDescription from './QuestionDescriptionComponent';
import Header from '../HeaderComponent/HeaderComponent';
import SubHeader from '../SubHeaderComponent/SubHeaderComponent';
import './UploadHomeworkComponent.scss';

class UploadHomeworkComponent extends React.Component {
    constructor() {
      super();
      this.state = {
        problems: [],
        homeworkName: '',
        dueDate: '',
        numberOfProblems: 1
      }
      this.dataMain = {};
      this.addAnotherProblem = this.addAnotherProblem.bind(this);
      this.removeProblem = this.removeProblem.bind(this);
      this.handleHomeworkUploadSubmit = this.handleHomeworkUploadSubmit.bind(this);
      this.handleHomeworkName = this.handleHomeworkName.bind(this);
      this.handleDueDate = this.handleDueDate.bind(this);
      this.problemUpdate = this.problemUpdate.bind(this);
      this.msg = this.msg.bind(this);
      this.getBase64 = this.getBase64.bind(this);
    }

    getBase64(file, cb) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
          cb(reader.result)
      };
      reader.onerror = function (error) {
          console.log('Error: ', error);
      };
    }

    addAnotherProblem() {
      this.setState({ 
        problems: [...this.state.problems,{}],
        numberOfProblems: this.state.numberOfProblems+1
      })
    }

    removeProblem() {
      this.setState({ 
        problem: this.state.problems.splice(0,1),
        numberOfProblems: this.state.numberOfProblems-1
      })
    }


    handleHomeworkUploadSubmit(event) {

      var hw_dd = new FormData();
      hw_dd.append("homeworkName", this.state.homeworkName);
      hw_dd.append("dueDate", this.state.dueDate);

      // API call to create homework - assumptions - hw name is unique
      // fetch('http://localhost:8080/create', {
      //   method: 'POST',
      //   body: fd,
      //   mode: "no-cors"
      // });

      const n = this.state.numberOfProblems;

      for(let i=0; i<n; i++) {
        let prob = new FormData();
        prob.append("homeworkName", this.state.homeworkName);
        prob.append("problemName",document.getElementById(i).getElementsByTagName("input")[0].value);
        prob.append("problemDescription",document.getElementById(i).getElementsByTagName("input")[1].value);
        prob.append("inputFile",document.getElementById(i).getElementsByTagName("input")[2].files[0]);
        prob.append("outputFile",document.getElementById(i).getElementsByTagName("input")[3].files[0]);

        // API call to add problems to homework
        // fetch('http://localhost:8080/create', {
        //   method: 'POST',
        //   body: prob,
        //   mode: "no-cors"
        // });
      }

      this.props.history.push('/professorConfirmation');

      // const data = {
      //   problems: this.state.problems,
      //   homeworkName: this.state.homeworkName,
      //   dueDate: this.state.dueDate
      // }

      // const n = this.state.numberOfProblems;

      // for(let i = 0; i<n; i++) {

      //   let prob = {
      //     problemName: document.getElementById(i).getElementsByTagName("input")[0].value,
      //     problemDescription: document.getElementById(i).getElementsByTagName("input")[1].value,
      //     testCases: [ {
      //       testCaseFile: document.getElementById(i).getElementsByTagName("input")[2].files[0],
      //       expectedOutputFile: document.getElementById(i).getElementsByTagName("input")[3].files[0],
      //     }]
      //   }
      //   if(data['problems'].length < i)
      //     data['problems'].push(prob);
      //   else
      //     data['problems'][i] = prob;
      // }

      // var fd = new FormData();
      // // fd.append("inputFile",data['problems'][0]['testCases'][0]['testCaseFile']);
      // // fd.append("outputFile",data['problems'][0]['testCases'][0]['expectedOutputFile']);

      // var arr = [];
      // for(let i = 0; i<n; i++) {
        
      //   let ip64 = '';
      //   let op64 = '';

      //   this.getBase64(data['problems'][i]['testCases'][0]['testCaseFile'].file, (result) => {
      //       ip64 = result;
      //   });

      //   this.getBase64(data['problems'][i]['testCases'][0]['expectedOutputFile'].file, (result) => {
      //     op64 = result;
      //   });
      //   console.log(ip64);
      //   const obj = {
      //     // "inputFile": data['problems'][i]['testCases'][0]['testCaseFile'],
      //     // "outputFile": data['problems'][i]['testCases'][0]['expectedOutputFile']
      //     "inputFile": ip64,
      //     "outputFIle": op64
      //   }
      //   arr.push(obj);
      // }
      // fd.append("test", arr);

      // console.log(arr);

      // var formData = new FormData();
      // formData.append("homeworkName", this.state.homeworkName);
      // formData.append("dueDate", this.state.dueDate);
      // formData.append("proplems", null);

      // fetch('http://localhost:8080/create', {
      //   method: 'POST',
      //   body: fd,
      //   mode: "no-cors"
      // });
      // this.props.history.push('/');
    }

    handleHomeworkName(e) {
      this.setState({homeworkName: e.target.value});
    }

    handleDueDate(e) {
      this.setState({dueDate: e.target.value});
    }

  //   myCallback = (dataFromChild) => {
  //     [...we will use the dataFromChild here...]
  // },
    problemUpdate(dataFromChild) {
      this.dataMain = dataFromChild;
      // console.log(dataFromChild);
      // var idx = dataFromChild.id;
      // var newProbs = this.state.problems;
      // if(newProbs.length < idx)
      //   newProbs.push(dataFromChild);
      // else
      //   newProbs[idx] = dataFromChild;

      // this.setState({
      //   problem: newProbs
      // })
    }

    msg() {
      // console.log("this changed!")
      let myForm = document.getElementById('myForm');
      let formData = new FormData(myForm);

      console.log(formData);
    }
  
    render() {
      return (
        <div className='professor-container'>
            <Header />
            <SubHeader user="Professor"/>
            <h2 className="professor-heading">Create Homework</h2>
            <div className="professor-form">
              Homework Name: <input className="homework-name" type="text" name="homeworkName" onChange={this.handleHomeworkName}/>
              Due Date: <input type="date" name="dueDate" onChange={this.handleDueDate}/>
              <QuestionDescription id={0} questionData={this.problemUpdate}/>
              {
                this.state.problems.map((problem,index) => {
                  return (
                    <QuestionDescription key={index} id={index+1} questionData={this.problemUpdate}/>
                  )
              })
              }
              <input type="button" onClick={this.addAnotherProblem} value="Add another problem"/>
              {
                (this.state.problems.length>0) ? 
                  <input type="button" onClick={this.removeProblem} value="Remove"/>
                  :
                  ""
              }

              <br />
              <button type="submit" onClick={this.handleHomeworkUploadSubmit}>Submit</button>
            </div>
        </div>
      );
    }
  }

  export default UploadHomeworkComponent;