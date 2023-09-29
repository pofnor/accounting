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
      <div className='container'>
        <form onSubmit={(e)=>{this.handleSubmit(e)}}>
          <div className='input-group pt-5'>
            <div className='form-floating'>
              <input className='form-control' id='year' type='text' placeholder='Year' value={this.state.yDate} onChange={(e)=>this.yearChange(e)}></input>
              <label htmlFor='year'>Year</label>
            </div>
            <div className='form-floating'>
              <input className='form-control' id='month' type='text' placeholder='Month'value={this.state.mDate} onChange={(e)=>this.monthChange(e)}></input>
              <label htmlFor='month'>Month</label>
            </div>
            <div className='form-floating'>
              <input className='form-control' id='day' type='text' placeholder='Day'  value={this.state.dDate} onChange={(e)=>this.dayChange(e)}></input>
              <label htmlFor='day'>Day</label>
            </div>
          </div>
          <br></br>
          <div className='form-check-inline'>
            <div className='input-group'>
              <div className='input-group-text'>$</div>
              <div className='form-floating'>
                <input className='form-control' id='bill' type='number' placeholder='Bill' value={this.state.bill} onChange={(e)=>this.billChange(e)}></input>
                <label htmlFor='bill'>Bill</label>
              </div>
            </div>
          </div>
          <div className='form-check-inline'>
            <div className='form-check form-switch'>
              <input className='form-check-input' type="checkbox" id='checkboxIncome' name="checkboxIncome" checked={this.state.isIncome} onChange={(e)=>{this.checkIncome(e)}}></input>
              <label htmlFor='checkboxIncome'  style={{color:"whitesmoke"}} className='from-check-label'>Income</label>
            </div>
          </div>
          <br></br><br></br>
          <button type='submit' className='btn btn-primary btn-lg'>Submit</button>
          <br></br><br></br>          
          <div className='input-group'>
            <div className='input-group-text'>My Current Balance :</div>
            <div className='input-group-text'>$</div>
            <input className='form-control' type='number' value={this.state.balance} readOnly></input>            
          </div>
          <p className='prompt'>{this.state.error}</p>        
        </form>
      </div>
    );
  }
};

export default Balance;    