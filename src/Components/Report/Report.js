import axios from 'axios';
import React from 'react';
// import './Report.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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
    <TableContainer>
      <Table>
      <TableHead>
      <TableRow key={"trHead"}>
      <th className='th' key={"Balance"}>Balance</th>
      <th className='th' key={"Bill"}>Bill</th>      
      <th className='th' key={"Year"}>Year</th>
      <th className='th' key={"Month"}>Month</th>
      <th className='th' key={"Day"}>Day</th>
      </TableRow>
      </TableHead>      
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
      </Table>      
    </TableContainer>
    )
  }
}


export default Report;