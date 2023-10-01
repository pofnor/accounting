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
      <tr>
      <th className='th'>Balance</th>
      <th className='th'>Bill</th>      
      <th className='th'>Year</th>
      <th className='th'>Month</th>
      <th className='th'>Day</th>
      </tr>
      </thead>      
      {this.state.accounting.map(accounting => 
        <tbody key={accounting.id+"tBody"}>
          <tr className='tr'>
            <td className='td'>{accounting.balance}</td>
            <td className='td'>{accounting.isIncome==="true" ? "+" + accounting.bill : "-" + accounting.bill}</td>          
            <td className='td'>{accounting.y}</td>
            <td className='td'>{accounting.m}</td>
            <td className='td'>{accounting.d}</td>        
          </tr>
        </tbody>
      )}      
    </table>
    )
  }
}
export default Report;