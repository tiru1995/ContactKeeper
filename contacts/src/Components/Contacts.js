import React, {useContext,Fragment}from 'react'
import contactContext from '../Context/Contacts/contactContext';
import ContactItem from '../Components/ContactItem';
 
const Contacts = () => {
     const contactsContext = useContext(contactContext)
     const{contacts}= contactsContext
     console.log(contacts,"contacts")
    return (
        <Fragment>
            {contacts.map(contact=>(
               <ContactItem key={contact.id} contact={contact}/>
            ))}
        </Fragment>
    )
}
export default Contacts;