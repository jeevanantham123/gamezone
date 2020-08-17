import React, { Component} from 'react'
import axios from 'axios';
import '../css/userhome.css';
import gaming from '../images/beautyPuzzle.gif';
//import comingsoon from '../images/comingsoon.gif';
import {Button} from 'react-bootstrap';
import { FaForward , FaPlayCircle, FaBackward} from 'react-icons/fa';
import history from '../history';
import BeatLoader from "react-spinners/ClipLoader";
import Countdown from 'react-countdown';

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
        this.handleStartGame = this.handleStartGame.bind(this);
    }
    componentDidMount(){
        const now = new Date();
       
        const sendGetRequest = async () => {
            try{
                await axios.get('api/game/',{
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
            catch(err){
                console.log(err);
            }
        }  
         sendGetRequest();    
    }

    handleStartGame(id){
        const game = this.state.OnGoingGames.filter((g) => {
            return g._id === id;
    });
    history.push({
        pathname:'/startgame',
        state : {game : game}
    })
    }
    render() {
        return (
            <div className="user-home">
                <Banner/>
                <div className="games-screen">
                    <b>Coming Soon&nbsp;<FaForward/></b>
                        {
                         this.state.isLoaded ?
                        <ComingSoon games={this.state.ComingSoonGames}/>:
                        <div>
                            <BeatLoader
                            size={50}
                            color={"white"}
                            loading={!this.state.isLoaded}
                            />
                        </div>
                        }
                    <b>On Going Now&nbsp;<FaPlayCircle/></b>
                        {
                         this.state.isLoaded ?
                        <OnGoing games={this.state.OnGoingGames} handleStartGame = {this.handleStartGame}/>:
                        <div>
                            <BeatLoader
                            size={50}
                            color={"white"}
                            loading={!this.state.isLoaded}
                            />
                        </div>
                        }
                    <b>Past Games&nbsp;<FaBackward/></b>
                        {
                         this.state.isLoaded ?
                        <PastGames games={this.state.FinishedGames}/>:
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

export function ComingSoon(props){
    const games = props.games;
    const gamesList = [];
    games.forEach(game => {
        gamesList.push( 
        <div key={game._id} className="inside-element">
            <h6>{game.gameName}</h6>
            <img src={game.gameImage} alt="not Available!"/>
            <br/>
                    <div className="timer">
                        Starts in:
                        &nbsp;
                        <Countdown
                        date={game.startTime}
                        renderer = {(props)=> <span >{props.days}d {props.hours}h {props.minutes}m {props.seconds}s</span>}
                        />
                    </div>
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
    const gamesList = [];
    games.forEach(game => {
        gamesList.push( 
        <div key={game._id} className="inside-element">
            <h6>{game.gameName}</h6>
            <img src={game.gameImage} alt="not Available!"/>
            <br/>
            <Button className="bg-success" type="button" onClick={()=> props.handleStartGame(game._id)}>Play Now</Button>
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


export function Banner(props){
    return(
        <div className="banner">
            <img src={gaming} alt=""/>
        </div>
    )
}


