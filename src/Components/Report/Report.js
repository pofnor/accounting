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
            <TableCell key={"Balance"}>Balance</TableCell>
            <TableCell key={"Bill"}>Bill</TableCell>      
            <TableCell key={"Year"}>Year</TableCell>
            <TableCell key={"Month"}>Month</TableCell>
            <TableCell key={"Day"}>Day</TableCell>
            </TableRow>
        </TableHead>      
      {this.state.accounting.map(accounting => 
        <TableBody key={accounting.id+"tBody"}>
          <TableRow key={accounting.id+"trBody"}>
            <TableCell key={accounting.id+"balance"}>{accounting.balance}</TableCell>
            <TableCell key={accounting.id+"isIncome"}>{accounting.isIncome==="true" ? "+" + accounting.bill : "-" + accounting.bill}</TableCell>          
            <TableCell key={accounting.id+"y"}>{accounting.y}</TableCell>
            <TableCell key={accounting.id+"m"}>{accounting.m}</TableCell>
            <TableCell key={accounting.id+"d"}>{accounting.d}</TableCell>        
          </TableRow>
        </TableBody>
      )}
      </Table>      
    </TableContainer>
    )
  }
}


export default Report;