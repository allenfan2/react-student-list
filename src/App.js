import React, { Component } from 'react';
import CardDisplay from './CardDisplay'

class App extends Component {
  state ={
    loading:false,
    data:[],
  }

  componentDidMount(){
    fetch("https://www.hatchways.io/api/assessment/students")
    .then((res)=> {return res.json()})
    .then((res) => {
      const tagdata = res.students
      tagdata.forEach(s=>{
        s.tags = []
      })
      this.setState({data:tagdata})
    })
  }

  handleTags=(tag,id)=>{
    const newState = [...this.state.data]
    newState.forEach(p=>{
      if (p.id === id){
          p.tags.push(tag)
      }
    })
    this.setState({
     data:newState
    })
    
  }

  render() {
    return (
      <div className="App">
      <CardDisplay handleTags={this.handleTags}students={this.state.data}/>
      </div>
    );
  }
}

export default App;
