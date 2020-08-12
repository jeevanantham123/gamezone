import React, { Component } from 'react'
import '../css/winner.css';
// import history from '../history';
import {Banner} from './userhome';
import bg from '../images/confetti-3-x.png';
export default class Winner extends Component {

    componentWillMount(){
        if(this.props.location.state === undefined){
            console.log('err');
            window.location.href ="/";
        }   
    }
    render() {
        return (
            <div className="winner">
                <Banner/>
                <div className="inner-winner">
                    <img src={bg} alt=""/>
                    <p>Winner!</p>
                </div>
            </div>
        )
    }
}
