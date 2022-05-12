import React, {useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../App.css';
import { Button, makeStyles } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import {useDispatch, useSelector} from "react-redux"
import { deleteUser, loadUsers } from '../redux/action';
import  {useNavigate} from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
const useStyles = makeStyles({
    table: {
       // marginTop: 100,
        minWidth: 900,
    }
})

export const Home = () => {
  const classes = useStyles();
  let dispatch = useDispatch();
  const history = useNavigate();
  const {users} = useSelector(state => state.data_users)
  useEffect(()=>{
    dispatch(loadUsers())
  }, [])

  const handleDelete = (id) => {
    if(window.confirm('Are u sure wanted to delete this user ?')){
      dispatch(deleteUser(id));
    }
  }
  return (
    <div className="App">
      
    <header className="App-header">
    <Button style={{marginBottom: 50}} 
          variant="contained" color='primary'
            onClick={()=>history('/add')}>
      Add User</Button>
    <TableContainer component={Paper}>
      <Table className={ classes.table } aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Contact</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center">{row.contact}</StyledTableCell>
              <StyledTableCell align="center">{row.address}</StyledTableCell>
              <StyledTableCell align="center">
              <Stack direction="row" spacing={2}>
                <Button variant="contained" color='primary'
                onClick={()=> history(`/edit/${row.id}`)}
                >Edit</Button>
                <Button variant="outlined" color="secondary"
                onClick={()=> handleDelete(row.id)}
                >
                  Delete</Button>
              </Stack>

              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </header>
    </div>
  )
}


