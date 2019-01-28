import React, { Component } from 'react'
import Cards from './Cards'

export default class CardDisplay extends Component {
    constructor(){
        super()
        this.state ={
            search:"",
            tagSearch:""
        }
    }
    handleChange =(event)=>{
        const{name,value}=event.target
        this.setState({
            [name]:value
        })
    }



    render(){
        const filterCards = this.props.students.filter(p=>{
            var string = (p.firstName + " " + p.lastName).toLocaleLowerCase()
            return string.indexOf(this.state.search.toLocaleLowerCase())!==-1
        })

        const filterTags = filterCards.filter(p=>{
            if(this.state.tagSearch !==""){
                let match = false
                p.tags.forEach(t=>{
                    const lt = t.toLocaleLowerCase()
                    if(lt.indexOf(this.state.tagSearch.toLocaleLowerCase())!==-1){
                        match = true
                    }
                })
                return match
            }else{
                return true
            }
        })

        const cards = filterTags.map(p => {
            return <Cards handleTags={this.props.handleTags} key={p.id} {...p}
            />
        })
        return (
            <div className="CardDisplayer">
                <div className="search">
                <input type='text' placeholder="Search by Name"
                    name="search"
                    value = {this.state.search} 
                    onChange={this.handleChange}
                />
                <input type='text' placeholder="Search by Tags"
                name="tagSearch"
                value = {this.state.tagSearch} 
                onChange={this.handleChange}
            />
                </div>
                {cards}
            </div>
        )
    }

}
