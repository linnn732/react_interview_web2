import { Button } from 'react-bootstrap';
import React, { Component } from 'react'
import './css/Situation.css';
import ReactDOM from 'react-dom';
import Main from './Main';
import { Row,Col,Tab } from 'react-bootstrap';

class Situation extends Component {

    constructor(props){
        super(props);
        this.getdata = this.getdata.bind(this);

        this.state={
            IntervieweeList:JSON.parse(localStorage.getItem("IntervieweeList"))
        }
    }

    componentDidMount(){
        this.getdata()    
    }

    getdata(){

        console.log("有")
        // let IntervieweeList = JSON.parse(localStorage.getItem("IntervieweeList"));//this.state.EmailListTemp;
        // if(IntervieweeList == null){
        //     IntervieweeList = []
        // }
        
        // localStorage.setItem("IntervieweeList",JSON.stringify(IntervieweeList))
        // this.setState({"IntervieweeList":IntervieweeList});
        // //console.log(NameListTemp)
        // let ElementListTemp2 = []
        // for(var interview_email of IntervieweeList){
        //     ElementListTemp2.push(<button variant="light" id={`${interview_email}`}>{interview_email}</button>)
        // }
        
        // ReactDOM.render(
        //     ElementListTemp2, document.getElementById('situation_background')
        // );
    }

    goback() {
        ReactDOM.render(
            <Main />, document.getElementById('Main')
        );
    }

    render() {
        return (
            <div className="situation">
            <div style={{"height":"50px"}}></div>
            <div className="situation_title">
                --------   Interview situation  --------
            </div>
            <div className="the_situation" id="the_situation" >
            <div style={{"height":"30px"}}></div>
                <Tab.Container id="list">
                        <Row>
                            <Col sm={6} className="s_intetviewee" st>
                                <div className="s_title1"> 面試名單 </div>
                            </Col>
                            <Col sm={5} className="s_situation">
                                <div className="s_title2"> 面試情形 </div>
                            </Col>
                        </Row>    
                            <div style={{"height":"25px"}}></div>
                            <div className="situation_background" id="situation_background">
                            </div>
                </Tab.Container>
            </div>
            <Button onClick={this.goback} variant="warning" className="btn_build">Back</Button>
            </div>
        );
    }
}
export default Situation;
