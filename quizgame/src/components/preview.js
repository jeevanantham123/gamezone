import React, { Component } from 'react'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import '../css/preview.css';
import axios from 'axios';
export default class Preview extends Component {
    constructor(props){
        super(props);
        if(this.props.location.state === undefined){
            window.location = "/admin";            
        }
        this.state = {
            gameName : this.props.location.state.data.gameName,
            gameImage:this.props.location.state.data.gameImage,
            startTime: this.props.location.state.data.startTime,
            endTime: this.props.location.state.data.endTime,
            questions:this.props.location.state.data.questions,
            steps:this.props.location.state.data.steps,
            gameBgColor:this.props.location.state.data.gameBgColor,
            gameCreator:this.props.location.state.data.gameCreator,
            preview : this.props.location.state.preview
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        const game = this.props.location.state.data;
        axios.post('http://localhost:5000/game/add',game)
        .then(res => {
            this.props.history.goBack();
        });
    }
    render() {
        return (
            <div className ="preview">
                <h4 style={{textAlign:"center"}}>Preview</h4>
                <form>
                <FormGroup>
                    <ControlLabel>Game Name</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.gameName}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Game Creator</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.gameCreator}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Game Image</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.gameImage}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Game BgColor</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.gameBgColor}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Game Start Time</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.startTime}
                    />
                </FormGroup><FormGroup>
                    <ControlLabel>Game End Time</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.endTime}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Questions</ControlLabel>
                    <QuestionsList questions={this.state.questions}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Steps</ControlLabel>
                    <StepsList steps={this.state.steps}/>
                </FormGroup>
                {this.state.preview?
                <div className="submit">
                <Button id="success-button" className="bg-success"  bsSize="small" type="button" onClick={this.handleSubmit}>
                        Confirm
                </Button>
                </div>:
                <div></div>
                }
                </form>
            </div>
        )
    }
}

export function QuestionsList(props) {
    const questions = props.questions;
    const listItems = questions.map((que) =>
      <li key={que['id']}>
          Question:&nbsp;<input type="text" value={que['question']}/>
          <br/>
          Answer:&nbsp;<input type="text" value={que['answer']}/>
          <br/>
          Image:&nbsp;<input type="text" value={que['image']}/>
          <br/>
          shuffledAnswer:&nbsp;<input type="text" value={que['shuffledAnswer']}/>
      </li>
    );
    return (
      <div className ="q-list">
        <ul>{listItems}</ul>
      </div>
    );
  }

  export function StepsList(props){
    const steps = props.steps;
    const listItems = steps.map((step,index) =>
      <li key={index}>
        {step}
      </li>
    );
    return (
      <div className ="s-list">
        <ul>{listItems}</ul>
      </div>
    );
  }