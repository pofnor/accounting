import React from 'react';
import './InputForm.css';
import Post from '../Post/Post.js';
import axios from 'axios';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

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
      <Box
      sx={{
        color:'whitesmoke'         
      }}
      >
      <form style={{padding : "20px"}} autoComplete="off" onSubmit={(e)=>{this.handleSubmit(e)}}>
        <TextField id="outlined-basic" sx={{ input: { color: 'whitesmoke' } }}label="Year" variant="outlined" value={this.state.yDate} onChange={(e)=>this.yearChange(e)} />
        <TextField id="outlined-basic" sx={{marginLeft:"5px",color:"whitesmoke"}} label='Month'value={this.state.mDate} onChange={(e)=>this.monthChange(e)} />
        <TextField id="outlined-basic" sx={{marginLeft:"5px"}} label='Day'  value={this.state.dDate} onChange={(e)=>this.dayChange(e)} />
        <br></br><br></br>
        <FormControl fullWidth sx={{color:"whitesmoke"}}>
          <InputLabel htmlFor="outlined-adornment-amount">Bill</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}            
            label="Bill"
            sx={{color:"whitesmoke"}}
            value={this.state.bill} 
            onChange={(e)=>this.billChange(e)}
          />
        </FormControl>        
        <FormControlLabel label="Income" labelPlacement="end" sx={{marginLeft:"5px"}} control={<Checkbox />} checked={this.state.isIncome} onChange={(e)=>{this.checkIncome(e)}} />            
        <br></br><br></br>
        <Button variant="contained" startIcon={<SaveIcon />} type='submit'>Submit</Button>        
        <br></br><br></br>
        <TextField id="outlined-basic" sx={{ input: { color: 'whitesmoke' } }} label='My Current Balance : ' type='number' value={this.state.balance} readOnly />        
        
        <p className='prompt'>{this.state.error}</p>           
      </form>      
      </Box>      
    );
  }
};

export default Balance;    