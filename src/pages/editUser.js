import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, makeStyles } from '@material-ui/core';
import  {useNavigate, useParams} from "react-router-dom";
import Alert from '@mui/material/Alert';
import { addUser, editUser, loadUser } from '../redux/action';
import {useDispatch, useSelector} from "react-redux"

export const EditUser = () => {
  let {id} = useParams();
  const history = useNavigate();  
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.data_users)
  useEffect(()=>{
    dispatch(loadUser(id))
  }, [])

  useEffect(()=>{
    if(user){
        setState({...user})
    }
  }, [user])
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
        dispatch(editUser(id, state));
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
        <h2>Edit User</h2>
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
                    >Update</Button>
            <Button style={{marginLeft: 20}} variant="contained" color='secondary'
                    onClick={()=>history('/')} 
                    >Go Back</Button>                    
            </div>
        
        </Box>
    </div>
  )
}
