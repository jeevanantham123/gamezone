import React, { Component } from 'react'

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            gameName:'',
            gameImage:'',
            startTime:'',
            endTime:'',
            questions:[],
            que:{
                question:'',
                answer:'',
                image:'',
                suffledAnswer:''
            },
            steps:[],
            gameBgColor:'',
            gameCreator:''
        };
        this.handlechangeGameName = this.handlechangeGameName.bind(this);
        this.handlechangeGameImage = this.handlechangeGameImage.bind(this);
        this.handlechangeStartTime = this.handlechangeStartTime.bind(this);
        this.handlechangeEndTime = this.handlechangeEndTime.bind(this);
    }
    render() {
        return (
            <div className="home">
                
            </div>
        )
    }
}
