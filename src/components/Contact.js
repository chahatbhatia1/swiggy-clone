import React, { useEffect, useState } from 'react'

const Contact = () => {

    useEffect(() => {}, []);
    
    return (
        <div className="p-5 text-center">
            <h1 className="font-bold text-3xl mt-5">Contact Us</h1>
            <h2 className='text-xl mb-10'>Email: namastedev@support.in</h2>

            <form className="flex flex-col w-96 mx-auto">
                <input type='text' className='p-2 my-3 border'  placeholder='Enter your name' />
                <input type='text' className='p-2 mb-4 border'  placeholder='Enter your message' />

                <button className='p-2 border w-60 mx-auto bg-gray-100 rounded outline-none'>Submit</button>
            </form>
        </div>
    )
}

export default Contact