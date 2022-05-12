import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, makeStyles } from '@material-ui/core';
import  {useNavigate} from "react-router-dom";
import Alert from '@mui/material/Alert';
import {useDispatch} from "react-redux"
import { addUser } from '../redux/action';

const useStyles= makeStyles((themes) => ({
    root: {
        "& > *":{
            margin: themes.spacing(1),
            width: '45ch'
        }
    }
}));

export const AddUser = () => {
  const history = useNavigate();  
  const dispatch = useDispatch();
  const [state, setState ] = useState({
      name: "",
      email:"",
      contact: "",
      address: ""
  })
  const [error, setError ] = useState("") ;
  const {name, email, contact, address} = state;
  const handlerSave = (e) =>{
      e.preventDefault();
    if(!name || !address || !email || !contact) {
        setError('Please fill all fields')
    }else {
        dispatch(addUser(state));
        history('/');
        setError()

    }
    
     
  }

  const handleInputChange = (e) => {
      let {name, value} = e.target;
      setState({...state, [name]: value})
  }
  return (
    <div align="center">
        <h2>Add User</h2>
        {error &&
                <h3 style={{width:'50%'}}>
                <b><Alert severity="error">{error}</Alert></b>
                </h3>
        }

        <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handlerSave}
                >
                <div>
            <TextField id="name" name="name" label="name" value={name} onChange={handleInputChange} /><br/>
            <TextField id="email" name="email" label="email" value={email} onChange={handleInputChange}/><br/>
            <TextField id="contact" name="contact" label="contact" value={contact} onChange={handleInputChange}/><br/>
            <TextField id="address" name="address" label="address" value={address} onChange={handleInputChange}/>
                </div>
            <div>
            <Button variant="contained" color='primary'
            type='submit'
                    >Save</Button>
            <Button style={{marginLeft: 20}} variant="contained" color='secondary'
                    onClick={()=>history('/')} 
                    >Go Back</Button>                    
            </div>
        
        </Box>
    </div>
  )
}
