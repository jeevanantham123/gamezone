import React, { Component } from 'react'
import axios from 'axios';
export default class UserHome extends Component {
    constructor(props){
        super(props);
        window.localStorage.setItem("User Action" , true);
    }
    componentDidMount(){
        axios.get('http://localhost:5000/game/',{
            withCredentials:true
        })
        .then( res => console.log(res.data));

    }
    render() {
        return (
            <div>
                This is User Home Component!
            </div>
        )
    }
}
