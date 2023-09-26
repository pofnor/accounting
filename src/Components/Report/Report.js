import axios from 'axios';
import React from 'react';
import './Report.css';
const api = axios.create({
  baseURL:'http://localhost:3001/accounting'
})

class Report extends React.Component{
  state = {
    accounting:[]      
    };
  constructor(){
    super();
    api.get('/').then(res =>{
      this.setState({accounting:res.data})
    })
  }
  render(){
    return(
    <table className='report'>
      <thead key={"thead"}>
      <tr key={"trHead"}>
      <th className='th' key={"Balance"}>Balance</th>
      <th className='th' key={"Bill"}>Bill</th>      
      <th className='th' key={"Year"}>Year</th>
      <th className='th' key={"Month"}>Month</th>
      <th className='th' key={"Day"}>Day</th>
      </tr>
      </thead>      
      {this.state.accounting.map(accounting => 
        <tbody key={accounting.id+"tBody"}>
          <tr className='tr' key={accounting.id+"trBody"}>
            <td className='td' key={accounting.id+"balance"}>{accounting.balance}</td>
            <td className='td' key={accounting.id+"isIncome"}>{accounting.isIncome==="true" ? "+" + accounting.bill : "-" + accounting.bill}</td>          
            <td className='td' key={accounting.id+"y"}>{accounting.y}</td>
            <td className='td' key={accounting.id+"m"}>{accounting.m}</td>
            <td className='td' key={accounting.id+"d"}>{accounting.d}</td>        
          </tr>
        </tbody>
      )}      
    </table>
    )
  }
}


export default Report;