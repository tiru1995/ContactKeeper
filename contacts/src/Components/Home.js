import React from 'react'
import Contacts from '../Components/Contacts'
import ContactForm from '../Components/ContactForm';

 const Home = () => {
    return (
        <div className='grid-2'>
            <div>
            <ContactForm/>
            </div>
            <div>
            <Contacts/>
            </div>
        </div>
    )
}

export default Home
