import React, { Component } from 'react'
import { Button, FormGroup, FormControl, ControlLabel,HelpBlock } from "react-bootstrap";
import '../css/home.css';
import DateTimePicker from 'react-datetime-picker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            gameName:'',
            gameImage:'',
            startTime: new Date(),
            endTime:new Date(),
            questions:[],
            que:{
                question:'',
                answer:'',
                image:'',
                shuffledAnswer:''
            },
            steps:[],
            gameBgColor:'',
            gameCreator:'',
            questionFormerr:'',
            imagerr:'',
            dateerr:''
        };
        this.handlechangeGameName = this.handlechangeGameName.bind(this);
        this.handlechangeStartTime = this.handlechangeStartTime.bind(this);
        this.handlechangeEndTime = this.handlechangeEndTime.bind(this);
        this.handleaddQuestion = this.handleaddQuestion.bind(this);
        this.handlechangeQuestions= this.handlechangeQuestions.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handlechangeGameName(value){
        this.setState({
            gameName: value
        })
    }
    handlechangeGameImage(value){
        this.setState({
            gameImage: value
        })
    }
    handlechangeStartTime = date => this.setState({startTime:date});
    handlechangeEndTime = date => this.setState({endTime:date});
    handlechangeQuestions(key,val){
        var questionobj = this.state.que;
        questionobj[key] = val;
        this.setState({
            que:questionobj
        })
    }
    handleaddQuestion(){
        if(this.state.que.question && this.state.que.answer && this.state.que.image && this.state.que.shuffledAnswer){
            this.state.questions.push(this.state.que);
            console.log(this.state.questions);
            this.setState({
                questionFormerr:''
            });
            toast.success("Question Added!",{
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        }
        else{
            this.setState({
                questionFormerr:'Please fill all the fields!'
            })
        }
        const tempQue ={
            question:'',
            answer:'',
            image:'',
            shuffledAnswer:''
        }
        this.setState({
            que:tempQue
        })
    }
    handleSubmit(e){
        if(this.validateForm()){
        e.preventDefault();
        const game = {
            "gameName"    : this.state.gameName,
            "gameImage"   : this.state.gameImage,
            "startTime"   : this.state.startTime,
            "endTime"    : this.state.endTime,
            "questions"   : this.state.questions,
            "steps"     : ['a','b'],
            "gameBgColor" : 'blue',
            "gameCreator" : 'jeevanantham'
        }
        axios.post('http://localhost:5000/game/add',game)
        .then(res => console.log(res.data));
    }
    }
    validateForm(){
        var imageformat = /htt+[a-z0-9_]/;
        if(imageformat.test(this.state.gameImage)){
           if(this.state.startTime < this.state.endTime){
                this.setState({
                    imageerr:'',
                    dateerr:''
                });
                return true;
            }
            else{
                this.setState({
                    dateerr:'End date must be greater than start date!'
                });
            }
        }
        else{
            console.log("else");
            this.setState({
                imageerr:'Enter a image Link!'
            });
        }
    }
    render() {
        return (
            <div className="home">
                 <h3>Add a new Game</h3>
                <form >
                   <FormGroup controlId="gamename" bsSize="large">
                    <ControlLabel>Gamename</ControlLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={this.state.gameName}
                        onChange={e =>this.handlechangeGameName(e.target.value)}
                    />
                    </FormGroup>
                    <FormGroup controlId="gameimage" bsSize="large">
                    <HelpBlock>
                    <p className="text-danger">{this.state.imageerr}</p>
                    </HelpBlock>
                    <ControlLabel>Game Image(Enter link)</ControlLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={this.state.gameImage}
                        onChange={e =>this.handlechangeGameImage(e.target.value)}
                    />
                    </FormGroup>
                    <FormGroup controlId="starttime" bsSize="large">
                    <HelpBlock>
                    <p className="text-danger">{this.state.dateerr}</p>
                    </HelpBlock>
                    <ControlLabel>StartTime</ControlLabel>
                    <DateTimePicker
                    value = {this.state.startTime}
                    onChange={this.handlechangeStartTime}
                    />
                    </FormGroup>
                    <FormGroup controlId="endtime" bsSize="large">
                    <ControlLabel>EndTime</ControlLabel>
                    <DateTimePicker
                    value = {this.state.endTime}
                    onChange={this.handlechangeEndTime}
                    />
                    </FormGroup>
                    <FormGroup controlId="questions" bsSize="large">
                    <ControlLabel>Questions:</ControlLabel><br/>Currently Added:&nbsp;{this.state.questions.length}
                        <form className="question-form">
                            <ToastContainer />
                            <HelpBlock>
                            <p className="text-danger">{this.state.questionFormerr}</p>
                            </HelpBlock>
                            <FormGroup controlId="question" bsSize="small">
                                <p><span style={{fontSize:"17px"}}>&#8729;Question</span></p>
                                <FormControl
                                autoFocus
                                type="text"
                                value={this.state.que.question}
                                onChange={e =>this.handlechangeQuestions(e.target.id,e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup controlId="answer" bsSize="small">
                                <p><span style={{fontSize:"17px"}}>&#8729;Answer</span></p>
                                <FormControl
                                autoFocus
                                type="text"
                                value={this.state.que.answer}
                                onChange={e =>this.handlechangeQuestions(e.target.id,e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup controlId="image" bsSize="small">
                                <p><span style={{fontSize:"17px"}}>&#8729;Image(Enter link)</span></p>
                                <FormControl
                                autoFocus
                                type="text"
                                value={this.state.que.image}
                                onChange={e =>this.handlechangeQuestions(e.target.id,e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup controlId="shuffledAnswer" bsSize="small">
                                <p><span style={{fontSize:"17px"}}>&#8729;Shuffled Answer</span></p>
                                <FormControl
                                autoFocus
                                type="text"
                                value={this.state.que.shuffledAnswer}
                                onChange={e =>this.handlechangeQuestions(e.target.id,e.target.value)}
                                />
                            </FormGroup>
                            <div className="submit">
                            <Button id="login-button" bsSize="small" type="button" onClick={this.handleaddQuestion}>
                                Add Question
                            </Button>
                            </div>
                        </form>
                    </FormGroup>
                    <div className="submit">
                    <Button id="login-button" bsSize="small" type="submit">
                        Preview
                    </Button>
                    &nbsp;
                    <Button id="success-button" className="bg-success"  bsSize="small" type="button" onClick={this.handleSubmit}>
                        Confirm
                    </Button>
                    </div>
                </form>
            </div>
        )
    }
}
