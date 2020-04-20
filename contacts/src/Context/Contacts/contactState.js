import React, {useReducer} from 'react';
import { v4} from 'uuid';
import contactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CONTACTS,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CLEAR_CURRENT
}from '../types'

const  ContactState= props=>{
    const initialState={

        contacts:[{
            "id": 1,
            "name": "Tiru",
            "email": "tiru@gmail.com",
            "phone": 123456789,
            "type":"personal"
          },
          {
            "id": 2,
            "name": "john",
            "email": "john@yahoo.com",
            "phone": 222-444-333,
            "type":"personal"
          },
          {
            "id": 3,
            "name": "Mark",
            "email": "mark@yahoo.com",
            "phone": 111-333-111,
            "type":"professional"
          }],
          current:null
    }

const [state,dispatch]=useReducer(contactReducer,initialState);


const addContact =(contact)=>{
        contact.id= v4();
        dispatch({type:ADD_CONTACT,payload:contact})
}

  const deleteContact= id =>{
     dispatch({type:DELETE_CONTACT,payload:id})
   }
   const setCurrent=(contact)=>{
dispatch({type:SET_CURRENT,payload:contact})
}

   const updateContact =(contact)=>{
dispatch({type:UPDATE_CONTACT,payload:contact})
} 
   
const clearCurrent=()=>{
    dispatch({type:CLEAR_CURRENT})
   }
return (
    <contactContext.Provider value={{contacts:state.contacts,
    addContact,
    deleteContact,
    setCurrent,
    clearCurrent,
    updateContact,
    current:state.current
}}>
    {props.children}
    </contactContext.Provider>
)
}
export default ContactState; 