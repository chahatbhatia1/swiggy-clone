import React from 'react'
import User from './User'
import UserClass from './UserClass'

const About = () => {
  return (
    <div className='about-page'>
        <h1>About Us</h1>
        <h2>This is a sample about page 😊  </h2>

        {/* <User name="Chahat <function>" city="Jaipur" /> */}
        <UserClass name="Chahat <class>" city="Jaipur" />
    </div>
  )
}


export default About