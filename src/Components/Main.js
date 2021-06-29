import ReactDOM from 'react-dom';
import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Build from './Build';
import './css/Main.css';
import Situation from './Situation';

class Main extends Component {

    constructor(props){
        super(props);
        this.interview_btn_render = this.interview_btn_render.bind(this);
        this.situation = this.situation.bind(this);
        
        this.state={
            NameListTemp:JSON.parse(localStorage.getItem("NameListTemp")),
            IntervieweeList:[]
            //IntervieweeList:JSON.parse(localStorage.getItem("IntervieweeList"))
        }
    }

    componentDidMount(){
        this.interview_btn_render()    
    }

    interview_btn_render(){

        //清除面試名單
        localStorage.removeItem("IntervieweeList")

        let NameListTemp = JSON.parse(localStorage.getItem("NameListTemp"));//this.state.EmailListTemp;
        if(NameListTemp == null){
            NameListTemp = []
        }
        
        localStorage.setItem("NameListTemp",JSON.stringify(NameListTemp))
        this.setState({"NameListTemp":NameListTemp});
        //console.log(NameListTemp)
        let ElementListTemp = []
        for(var interview_name of NameListTemp){
            ElementListTemp.push(<button variant="light" className="interview_btn" value={interview_name} onClick={this.situation} id={`${interview_name}`}>{interview_name}</button>)
        }
        
        ReactDOM.render(
            ElementListTemp, document.getElementById('the_interview_build')
        );
    }

    gotobuild() {
        ReactDOM.render(
            <Build />, document.getElementById('Main')
        );
    }

    situation(event){

        let IntervieweeList = JSON.parse(localStorage.getItem("Interviewee"));//this.state.EmailListTemp;
        if(IntervieweeList == null){
            IntervieweeList = []
        }
        
        //取得面試名稱
        console.log(event.target.value)
        var build_name  = event.target.value
        var data = {"build_name": build_name }
        //var data= { "build_name": "高科管理員" }

        const fetch = require("node-fetch");
        global.Headers = fetch.Headers;      

        //取得面試名單
        fetch('http://localhost:3000/getbuilddata', { 
                    method:"POST",
                    body: JSON.stringify(data), // data can be `string` or {object}!
                    headers: new Headers({
                        'Content-Type': 'application/json'
                   })                
            })
                .then(res => res.json()) 
                .catch(e => {
                    console.log(e);
                //發生錯誤時要做的事情
                }) 
                .then(response => 
                    //console.log(response.build_interviewee));  //回傳面試名單
                    localStorage.setItem("IntervieweeList",response.build_interviewee));
                             
        ReactDOM.render(
            <Situation />, document.getElementById('Main')
        );
    }

    render() {

        return (
            <div className="build">
                <div style={{"height":"50px"}}></div>
                <div className="main_title">
                    --------   The interview you build   --------
                </div>
                <div className="the_interview_build" id="the_interview_build" ></div>
                <Button onClick={this.gotobuild} variant="danger" className="btn_build">Build</Button>
            </div>

        );

    }
}
export default Main;