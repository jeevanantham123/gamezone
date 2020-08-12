import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import {Banner} from './userhome';
import '../css/startgame.css';
import backspace from '../images/ic-backspace@3x.png';
import {FaUser} from 'react-icons/fa';
import Countdown from 'react-countdown';
import history from '../history.js';
export default class Startgame extends Component {
    constructor(props){
        super(props);
        this.state ={
            game : this.props.location.state.game[0]
        };
        this.handleBackSpace = this.handleBackSpace.bind(this);
        this.handleStartGame = this.handleStartGame.bind(this);
    }
    
    handleBackSpace(e){
        e.preventDefault();
        this.props.history.goBack();
    }
    handleStartGame(e){
        e.preventDefault();
        history.push({
            pathname : '/gamescreen',
            state:{game: this.state.game}
        })
    }   
    render() {
        return (
            <div className="game-choosen">
                <div className="inner-game-choosen">
                <Banner/>
                <div className="back-button" onClick={this.handleBackSpace}>
                    <img src={backspace} alt="back"/>
                </div>
                <div className="game-banner">
                    <Countdown
                    date={this.state.game.endTime}
                    renderer = {(props)=> <div id="game-end">Game Ends in: {props.days}d {props.hours}h {props.minutes}m {props.seconds}s</div>}
                    />
                    <img src={this.state.game.gameImage} alt=""/>
                    <h4>{this.state.game.gameName}</h4>
                </div>
                <div className="game-creator">
                    <h5>Creator:&nbsp;<FaUser/>&nbsp;{this.state.game.gameCreator}</h5>
                </div>
                <div className="steps">
                    <h6 style={{fontWeight:"bold"}}>Please read the below steps!</h6>
                    <StepsList steps={this.state.game.steps}/>
                </div>
                <Button id="play-button" className="bg-warning" type="button" onClick={this.handleStartGame}>
                    Play Now!
                </Button>
                </div>
            </div>
        )
    }
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