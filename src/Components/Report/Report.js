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
    <TableContainer
     sx={{padding:"20px"}}
    >
      <Table>
        <TableHead>
          <TableRow key={"trHead"}>
            <TableCell>Balance</TableCell>
            <TableCell>Bill</TableCell>      
            <TableCell>Year</TableCell>
            <TableCell>Month</TableCell>
            <TableCell>Day</TableCell>
            </TableRow>
        </TableHead>      
      {this.state.accounting.map(accounting => 
        <TableBody key={accounting.id+"tBody"}>
          <TableRow>
            <TableCell>{accounting.balance}</TableCell>
            <TableCell>{accounting.isIncome==="true" ? "+" + accounting.bill : "-" + accounting.bill}</TableCell>          
            <TableCell>{accounting.y}</TableCell>
            <TableCell>{accounting.m}</TableCell>
            <TableCell>{accounting.d}</TableCell>        
          </TableRow>
        </TableBody>
      )}
      </Table>      
    </TableContainer>
    )
  }
}


export default Report;