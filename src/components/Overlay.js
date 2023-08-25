import React from 'react'
import { createPortal } from 'react-dom'

const Overlay = ({onClose}) => {
    return (
        createPortal(
            <div 
                className={`fixed top-0 left-0 right-0 bottom-0 z-[10000] bg-[#282c3f] opacity-70`}
                onClick={onClose}
            >
            </div>,
            document.getElementById("overlay")
        )
    )
}

export default Overlay