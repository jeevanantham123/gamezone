import React, { Component } from 'react'
import '../css/gamescreen.css';
import {Button} from 'react-bootstrap';
import history from '../history';
import {Banner} from './userhome';
import backspace from '../images/wrong@3x.png';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import Timer from 'react-compound-timer';
import {FaReply} from 'react-icons/fa';
import Tick from '../images/correct@3x.png';
import quit from '../images/quit-emoji@3x.png';
export default class GameScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            timer : true,
            game : this.props.location.state.game,
            id : 0,
            counterText : 'game-counter'
        };
        this.handleBackSpace = this.handleBackSpace.bind(this);
        this.handleAnswered = this.handleAnswered.bind(this);
        this.handleQuitGame = this.handleQuitGame.bind(this);
        this.handleConfrimQuit=this.handleConfrimQuit.bind(this);
        this.handleCancelQuit=this.handleCancelQuit.bind(this);
    }
    handleBackSpace(e){
        e.preventDefault();
        const confirmDiv= document.getElementById('confirm-quit');
        confirmDiv.style.display='initial';
        const innerDiv=document.getElementById('inner-gameScreen');
        innerDiv.style.display = 'none';
    }
    handleAnswered(e){
        if((this.state.id+1) < this.state.game.questions.length){
            var currentQ = this.state.id;
            currentQ++;
            this.setState({
                id: currentQ,
                counterText:'question-counter',
                timer:true
            });
            this.componentDidMount();
        }
        else if((this.state.id+1) === this.state.game.questions.length){
            history.push({
                pathname:'/winner',
                state : {'winner' : true , gname: this.state.game.gameName}
            })
        }
    }
    handleQuitGame(e){
        e.preventDefault();
        this.props.history.goBack();
    }
    handleConfrimQuit(e){
        e.preventDefault();
        window.location.href = "/";
    }
    handleCancelQuit(e){
        const confirmDiv= document.getElementById('confirm-quit');
        confirmDiv.style.display='none';
        const innerDiv=document.getElementById('inner-gameScreen');
        innerDiv.style.display = 'inline-block';
    }
    componentDidMount(){
        setTimeout(() => {
            this.setState({
                timer : false
            });
        }, 5000);
    }
    render() {
        return (
            <div className="gameScreen">
                {this.state.timer ? 
                    <div className="white-screen">
                        <div className="inner-counter" >
                        <RoundCountdown text={this.state.counterText} quitgame={this.handleQuitGame}/> 
                        </div>
                    </div>
                    :
                    <div>
                    <Banner/>
                    <div id="confirm-quit">
                        <img src={quit} alt=""/>
                        <br/>
                        Are you sure?
                        <br/>
                        <Button id="cq-button" type="button" onClick={this.handleConfrimQuit}>Confirm</Button>
                        <Button id="cq=cancel" onClick={this.handleCancelQuit}>Cancel</Button>
                    </div>
                    <div id="inner-gameScreen" style={{background:this.state.game.gameBgColor}}>
                    <div className="gback-button" onClick={this.handleBackSpace}>
                        <img src={backspace} alt="back"/>
                    </div>
                    <div className="game-main">
                        <GameArea game={this.state.game} id={this.state.id} handleAnswered={this.handleAnswered}/>
                    </div>
                </div>
                </div>
                }
            </div>
        )
    }
}


export function RoundCountdown(props){
    const text = props.text;
    if(text === 'game-counter'){
        return(
            <div>
                <CountdownCircleTimer
                isPlaying
                duration={5}
                colors={[["#D14081"]]}
                >
                    {({ remainingTime }) =>  <span>Game will Start in<br/>{remainingTime}<br/>seconds</span>}
                </CountdownCircleTimer>
                <button id="quit-game" onClick={props.quitgame} type="button">x&nbsp; quit game</button>
            </div>
            )
    }
    if(text === 'question-counter'){
        return(
            <div>
                <p style={{color:"green"}}>Correct Answer</p>
                <img id="tick" src={Tick} alt=""/>
                <CountdownCircleTimer
                isPlaying
                duration={5}
                colors={[["#D14081"]]}
                >
                    {({ remainingTime }) =>  <span>Next Question in<br/>{remainingTime}<br/>seconds</span>}
                </CountdownCircleTimer>
            </div>
            )
    }
    
}



export function GameArea(props){ 
    const id= props.id;
    const game = props.game;
    return(
        <div className="block">
            <div className="block-topper">
               <div className="que-num">
               Question {id+1} of {game.questions.length}
               </div> 
            <div className="question-timer">
                <Timer
                  initialTime={20000}
                  direction="backward"  
                >
                    {() => (
                        <React.Fragment>
                            <Timer.Seconds />s left
                        </React.Fragment>
                    )}
                </Timer>
            </div>
            </div>
            <QuestionImage image={game.questions[id].image}/>
            <Question question={game.questions[id].question}/>
            <AnswerBlock answer={game.questions[id].answer} />
            <ShuffledAnswerBlock shuffledAnswer={game.questions[id].shuffledAnswer} answer={game.questions[id].answer} answered={props.handleAnswered} gname={game.gameName}/>
        </div>
    )
}

export function Question(props){
    const question = props.question;
    return(
        <div className="question">
            {question}
        </div>
    )
} 

export function QuestionImage(props){
    const questionImage = props.image;
    return(
        <div className="questionImage">
            <img src={questionImage} alt=""/>
        </div>
    )
}

export function AnswerBlock(props){
    var answer = props.answer;
    answer = answer.trim();
    const answerDivs = [];
    for (let index = 0; index < answer.length; index++) {
        const element = answer[index];
        answerDivs.push(
            <input type="text" key={element} className="inner-answer-div" readOnly/>
        );
        
    } 
    return(
        <div className="answer">
            {answerDivs}
        </div>
    )
}


export function ShuffledAnswerBlock(props){
    
    var shuffledAnswer = props.shuffledAnswer;
    const answerdiv = document.getElementsByClassName('answer');
    var clickedCount = 0;
    shuffledAnswer = shuffledAnswer.trim();
    const answer = props.answer;
    var staus = false;
    var tempAnswer = '';
    var checkTimer= setTimeout(() => {
        if(staus){
        }
        else{
           TimeOut();
        }
    }, 20000);
    const TimeOut = () => {
        clearInterval(checkTimer);
           history.push({
                pathname:'/betterluck',
                state : {'failure' : 'seems like time out!','name':props.gname}
        });
    }
    const userClicked = (e) => {
        if(validation() && e.target.value !== ''){
            var clickedChar = e.target.value;
            e.target.value = '';
            answerdiv[0].childNodes[clickedCount].value = clickedChar;
            clickedCount++;
            tempAnswer = tempAnswer + clickedChar;
            if(tempAnswer.toLowerCase() === answer){
                props.answered();
                staus = true;
                clearTimeout(checkTimer);
            }
            else{   
                if(tempAnswer.length === answer.length){
                    if(tempAnswer.toLowerCase() !== answer){
                        clearTimeout(checkTimer);
                        history.push({
                            pathname:'/betterluck',
                            state : {'failure' : 'seems like wrong answer!' ,'name':props.gname}
                        });
                    }
                }
            }
        }
    }
    
    const validation = () => {
        if(clickedCount < shuffledAnswer.length){
            return true
        }
        else{
            return false
        }
    }
    const deletefunc = () => {
        clickedCount = 0;
        tempAnswer = '';
        const aElements = answerdiv[0].childNodes;
        const sanswerdiv = document.getElementsByClassName('sanswer');
        const sElements = sanswerdiv[0].childNodes;
        for (let index = 0; index < shuffledAnswer.length; index++) {
            const element = shuffledAnswer[index];
            aElements[index].value = '';
            sElements[index].value = element.toUpperCase();
        } 
    }
    const answerDivs = [];
    for (let index = 0; index < shuffledAnswer.length; index++) {
        const element = shuffledAnswer[index];
        answerDivs.push(
            <input type="text"  key={element} className="inner-sanswer-div" value={element.toUpperCase()}
            onClick={(e) => {userClicked(e)}}  readOnly />
        );
        
    } 
    return(
        <div className="sanswer">
            {answerDivs}
            <br/>
            <button id="delete"  type="button"  onClick={deletefunc}>Delete<FaReply/></button>
        </div>
    )
}
