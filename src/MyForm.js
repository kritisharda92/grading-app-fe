import React from 'react';

class MyForm extends React.Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this);
    }
  
    handleNameChange(e) {
        this.setState({name: e.target.value});
    }

    handleDateChange(e) {
        this.setState({date: e.target.value});
    }

    handleSubmit() {
    //   event.preventDefault();
      const data = {
          name : this.state.name,
          date : this.state.date
      };
      
      console.log(data);

      fetch(`http://localhost:8080/create?name=${this.state.name}&date=${this.state.date}`, {
        method: 'POST',
        body: data,
      });
    
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Enter Homework name</label>
          <input id="name" name="name" type="text" onChange={this.handleNameChange}/>
            <br/><br/>
          <label htmlFor="date">Enter due date</label>
          <input id="date" name="date" type="text" onChange={this.handleDateChange} />
          <br/><br/>
          <button>Send data!</button>
        </form>
      );
    }
  }

  export default MyForm;