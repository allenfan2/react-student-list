import React, { Component } from 'react'

export default class Cards extends Component {
    constructor(){
        super()
        this.state={
            curTag:"",
            buttonURL: "https://cdn1.iconfinder.com/data/icons/basic-shaded-ui/256/down-512.png",
            isCollapsed: false
        }
    }

    calcAvg = (arr) => {
        let count = 0
        let totalsum = 0
        arr.forEach(grade => {
            totalsum += parseInt(grade)
            ++count
        }
        )
        return totalsum / count
    }

    handleClick=()=>{
        this.setState(prevState => ({
            isCollapsed:!prevState.isCollapsed,
            buttonURL:prevState.isCollapsed?
            "https://cdn1.iconfinder.com/data/icons/basic-shaded-ui/256/down-512.png":
            "https://cdn1.iconfinder.com/data/icons/basic-shaded-ui/256/up-512.png"
        }))
    }
    handleEnter=(event)=>{
        event.preventDefault()
        this.props.handleTags(this.state.curTag,this.props.id)
        this.setState({
           curTag:"",
        })
       
    }
    handleChange=(event)=>{
        const {name,value} = event.target
        this.setState({
            [name]:value
        })
    }

    render() {
        const student = this.props
        let i = 0
        const grades= this.props.grades.map(grade => {
            ++i
            return <p key={i}>Test {i}:     {grade}%</p>
        })
        const tagsDisplay = this.props.tags.map(t=>{
            return <span className="tags" key={t}>{t}</span>
        }
            )
        const average = this.calcAvg(student.grades)
        return (
            <div className="Card">
                <div className="AvatarHolder">
                    <img src={student.pic} alt="fail to load" />
                </div>
                <div className="Info">
                    <h3>{student.firstName} {student.lastName}</h3>
                    <div className="SubInfo">
                        <p>Email: {student.email}</p>
                        <p>Company: {student.company}</p>
                        <p>Skill: {student.skill}</p>
                        <p>Average: {average}%</p>
                        {this.state.isCollapsed &&  <br/>}
                        {this.state.isCollapsed &&  grades}
                        {this.state.isCollapsed &&
                            <div>
                            <br/>
                            {tagsDisplay}
                            <br/>
                            <br/>
                            <form onSubmit={this.handleEnter}> 
                            <input type="text" name="curTag" value={this.state.curTag}  placeholder="Add a tag"  onChange={this.handleChange} /></form>
                            </div>
                        }
                    </div>
                </div>
                <input  type="image" alt="collapseButton" src={this.state.buttonURL} onClick={this.handleClick} />
            </div>
        )
    }
}
