import React from 'react';
import './InputForm.css';
import Post from '../Post/Post.js';
import axios from 'axios';

const api = axios.create({
  baseURL:'http://localhost:3001/accounting'
})

class Balance extends React.Component{
  state = {
    balance:0,  
    bill:'',
    yDate:'',
    mDate:'',  
    dDate:'',
    isIncome:false,
    error:''
    };
  
  constructor() {
    super();
    api.get('/').then(response => {      
      this.setState({balance: response.data[response.data.length-1].balance})
    });    
  }
  
  billChange = (e) => {
    this.setState({bill : e.target.value});    
  }  
  checkIncome = (e) => {
    this.setState({isIncome : this.state.isIncome===false});
  }
  yearChange = (e) => {
    this.setState({yDate : e.target.value});    
  }
  monthChange = (e) => {
    this.setState({mDate : e.target.value});    
  }
  dayChange = (e) => {
    this.setState({dDate : e.target.value});    
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if((+this.state.yDate > 1999) && (+this.state.yDate < 2024) &&
       (+this.state.mDate > 0) && (+this.state.mDate < 13) &&
       (+this.state.dDate > 0) && (+this.state.dDate < 32)){
        if((+this.state.bill > 0)){   
          Post(this.state.balance,
            this.state.bill,this.state.isIncome,
            this.state.yDate,this.state.mDate,this.state.dDate);
          this.setState({bill: ''});    
          this.setState({yDate: ''});    
          this.setState({mDate: ''});    
          this.setState({dDate: ''});
          this.setState({error: ''});
          if(this.state.isIncome) this.setState({balance: +this.state.balance + +this.state.bill});
          else this.setState({balance: +this.state.balance - +this.state.bill});
        } else {
          this.setState({error: 'The Bill is invalid'});
        }
    } else {
      this.setState({error: 'The Date is invalid'});
    }    
  } 

  render(){
    return(
      <form style={{padding : "20px"}} onSubmit={(e)=>{this.handleSubmit(e)}}>        
        <input className='inputText' type='text' placeholder='Year' value={this.state.yDate} onChange={(e)=>this.yearChange(e)}></input>
        <input className='inputText' type='text' placeholder='Month'value={this.state.mDate} onChange={(e)=>this.monthChange(e)}></input>
        <input className='inputText' type='text' placeholder='Day'  value={this.state.dDate} onChange={(e)=>this.dayChange(e)}></input>
        <br></br>
        <input className='inputText' style={{width : "15%"}} type='number' placeholder='Bill' value={this.state.bill} onChange={(e)=>this.billChange(e)}></input>
        <span className='dollar'>$</span> 
        <input type="checkbox" name="checkboxIncome" checked={this.state.isIncome} onChange={(e)=>{this.checkIncome(e)}}></input>
        <span className='span'>Income</span>
        <button type='submit' className='btnGold'>Submit</button>
        <br></br><span className='span'>My Current Balance : </span>
        <input className='inputText' style={{width : "8%"}} type='number' value={this.state.balance} readOnly></input>
        <span className='dollar'>$</span>
        <p className='prompt'>{this.state.error}</p>        
      </form>
    );
  }
};

export default Balance;    