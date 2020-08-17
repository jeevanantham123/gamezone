import React, { Component } from 'react'
import '../css/adminGames.css';
import history from '../history';
import axios from 'axios';
import BeatLoader from "react-spinners/ClipLoader";
import {Button} from 'react-bootstrap';
import backspace from '../images/ic-backspace@3x.png';

export default class AdminGames extends Component {
    constructor(props){
        super(props);
        if(this.props.location.state === undefined){
            window.location = "/admin";            
        }
        this.state = {
            username : this.props.location.state.username,
            games : []
        };
        const username = this.state.username;
        axios.post('api/game/adminGames',{username})
        .then( res => {
            this.setState({
                games: res.data
            });
        });
        this.handlePreview = this.handlePreview.bind(this);
        this.handleBackSpace =  this.handleBackSpace.bind(this);
    }
    handleBackSpace(e){
        e.preventDefault();
        this.props.history.goBack();
    }
    handlePreview(game){
        history.push({
            pathname : '/admin/preview',
            state : {data : game, preview:false}
        });
    }
    render() {
        return (
            <div className="panel">
                <div className="inner-panel">
                <h4 style={{textAlign:"center"}}>Your Games</h4>
                <div className="back-button" onClick={this.handleBackSpace}>
                    <img src={backspace} alt="back"/>
                </div>
                {this.state.games.length > 0 ?
                <GameBlock games={this.state.games} handlePreview={this.handlePreview}/>:
                <div>
                    <BeatLoader
                    size={50}
                    color={"white"}
                    loading={!this.state.isLoaded}
                    />
                </div>
                }
                </div>
            </div>
        )
    }
}

export function GameBlock(props){
    const games = props.games;
    const gamesList = [];
    games.forEach((game,index) => {
        gamesList.push(
        <div id="game" key={index}>
            <div id="topper">
            <p style={{fontSize:"25px"}}>{game.gameName}
            <Button id="preview-butt" type="button" onClick={(e) => {props.handlePreview(game)}}>Preview</Button>
            </p>
            </div>
            <br/>
            {
            game.winners.length > 0?
            <div id="winners">
                <h5 style={{textDecoration:"underline"}}>Winners</h5>
                <Winners winners={game.winners}/>
            </div>:
            <div></div>
            }   
        </div>
        )
    });
    return(
        <div className="games">
            {gamesList}
        </div>
    )
}

export function Winners(props){
    const winners = props.winners;
    const winnersList = [];
    winners.forEach(winner => {
        winnersList.push(
        <li key={winner}>{winner}</li>
        );
    });
    return(
        <ul style={{fontSize:"15px"}}>
            {winnersList}
        </ul>
    )
}