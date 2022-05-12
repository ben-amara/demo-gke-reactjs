import * as types from "./actionType";
import axios from "axios";


const getUsers = (users)=> ({
    type: types.GET_USERS,
    payload: users,
});

const getUserById = (user)=> ({
    type: types.GET_USER,
    payload: user,
});


const userDeleted = () => ({
    type: types.DELETE_USER
})

const userAdded = (users)=> ({
    type: types.ADD_USER
});

const userUpdated = (users)=> ({
    type: types.EDIT_USER
});


export const loadUsers = ()=> {
    return function(dispatch) {
            axios.get(`${process.env.REACT_APP_API}/users`)
                .then(res => {
                    console.log('useers ==> ', res)
                    dispatch(getUsers(res.data))
                }).catch(err => console.log('err => ', err))
    }
}

export const loadUser = (id)=> {
    return function(dispatch) {
            axios.get(`${process.env.REACT_APP_API}/users/${id}`)
                .then(res => {
                    dispatch(getUserById(res.data))
                }).catch(err => console.log('err => ', err))
    }
}


export const deleteUser = (id)=> {
    return function(dispatch) {
            axios.delete(`${process.env.REACT_APP_API}/users/${id}`)
                .then(res => {
                    dispatch(userDeleted())
                    dispatch(loadUsers())
                }).catch(err => console.log('err => ', err))
    }
}

export const addUser = (user)=> {
    return function(dispatch) {
            axios.post(`${process.env.REACT_APP_API}/users`, user)
                .then(res => {
                    dispatch(userAdded())
                }).catch(err => console.log('err => ', err))
    }
}

export const editUser = (id, user)=> {
    return function(dispatch) {
            axios.put(`${process.env.REACT_APP_API}/users/${id}`, user)
                .then(res => {
                    dispatch(userUpdated())
                }).catch(err => console.log('err => ', err))
    }
}
















