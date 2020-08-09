import React, { Component} from 'react'
import axios from 'axios';
import '../css/userhome.css';
import gaming from '../images/gaming.gif';
//import comingsoon from '../images/comingsoon.gif';
import Timer from 'react-compound-timer'
import {Button} from 'react-bootstrap';
import { FaForward , FaPlayCircle, FaBackward} from 'react-icons/fa';

export default class UserHome extends Component {
    constructor(props){
        super(props);
        window.localStorage.setItem("User Action" , true);
        this.state = {
            ComingSoonGames : [],
            OnGoingGames:[],
            FinishedGames:[],
            isLoaded: false
        };
    }
    componentDidMount(){
        const now = new Date();
        axios.get('http://localhost:5000/game/',{
            withCredentials:true
        })
        .then( res => {
            if(res.data.games){
                for (const iterator of res.data.games) {
                    iterator.startTime = new Date(iterator.startTime);
                    iterator.endTime = new Date(iterator.endTime);
                    if(iterator.startTime > now){
                        this.state.ComingSoonGames.push(iterator);
                    }
                    else if(iterator.endTime < now){
                        this.state.FinishedGames.push(iterator);
                    }
                    else{
                        this.state.OnGoingGames.push(iterator);
                    }
                }
                this.setState({
                    isLoaded : true
                });
            }
            window.localStorage.setItem('sessionID' , res.data.sessionID);
        });

    }
    render() {
        return (
            <div className="user-home">
                <div className="games-screen">
                    <div className="banner">
                        <img src={gaming} alt=""/>
                    </div>
                    <b>Coming Soon&nbsp;<FaForward/></b>
                        {
                         this.state.isLoaded ?
                        <ComingSoon games={this.state.ComingSoonGames}/>:
                        <h5>Loading..</h5>
                        }
                    <b>On Going Now&nbsp;<FaPlayCircle/></b>
                        {
                         this.state.isLoaded ?
                        <OnGoing games={this.state.OnGoingGames}/>:
                        <h5>Loading..</h5>
                        }
                    <b>Past Games&nbsp;<FaBackward/></b>
                        {
                         this.state.isLoaded ?
                        <PastGames games={this.state.FinishedGames}/>:
                        <h5>Loading..</h5>
                        }
                    
                </div>
            </div>
        )
    }
}

export function ComingSoon(props){
    const games = props.games;
    console.log(games);
    const gamesList = [];
    games.forEach(game => {
        gamesList.push( 
        <div key={game._id} className="inside-element">
            <h6>{game.gameName}</h6>
            <img src={game.gameImage} alt="not Available!"/>
            <br/>
            <Timer
                initialTime={game.startTime}
                direction="backward"
            >
                {() => (
                    <div className="timer">
                        Starts in:
                        &nbsp;
                        <Timer.Hours />h
                        &nbsp;
                        <Timer.Minutes />m
                        &nbsp;
                        <Timer.Seconds />s
                    </div>
                )}
            </Timer>
        </div>)
    });
    return(
        <div className="coming-soon">
            {gamesList}
        </div>
    )
}

export function OnGoing(props){
    const games = props.games;
    console.log(games);
    const gamesList = [];
    games.forEach(game => {
        gamesList.push( 
        <div key={game._id} className="inside-element">
            <h6>{game.gameName}</h6>
            <img src={game.gameImage} alt="not Available!"/>
            <br/>
            <Button className="bg-primary" >Play Now</Button>
        </div>)
    });
    return(
        <div className="on-going">
            {gamesList}
        </div>
    )
}

export function PastGames(props){
    const games = props.games;
    console.log(games);
    const gamesList = [];
    games.forEach(game => {
        gamesList.push( 
        <div key={game._id} className="inside-element">
            <h6>{game.gameName}</h6>
            <img src={game.gameImage} alt="not Available!"/>
            <br/>
        </div>)
    });
    return(
        <div className="time-over">
            {gamesList}
        </div>
    )
}
