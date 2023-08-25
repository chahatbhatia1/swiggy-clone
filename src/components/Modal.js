import React from 'react'
import { createPortal } from 'react-dom'
import { useDispatch } from 'react-redux';
import { clearCart, clearRestaurant, computeTotal } from '../store/cartSlice';

const Modal = ({onClose}) => {
    const dispatch = useDispatch();

    const handleClearCart = () => { 
        dispatch(clearCart());
        dispatch(clearRestaurant());
        dispatch(computeTotal());

        onClose();
    }

    return (
        createPortal(
            <div className="overlay absolute flex justify-center items-center top-0 left-0 w-full h-screen
             bg-[#6460605f] z-[1100]"
                onClick={onClose}
            >
                <div className="min-w-[300px] max-w-[520px] p-8 bg-white">
                    <div className="pb-8">
                        <div className="text-xl pb-1.5 font-semibold text-[#282c3f] ">Items already in cart</div>
                        <div className="text-sm leading-3.5 font-light text-[#535665]">Your cart contains items from other restaurant. Would you like to reset your cart and try adding items from this restaurant again?</div>
                    </div>
                    <div className="h-12 text-base flex font-semibold">
                        <button className="cursor-pointer text-[#60b246] border-2
                            border-[#60b246] flex-grow uppercase" onClick={onClose}>No</button>
                        <span className="w-5"></span>
                        <button className="cursor-pointer text-[#fff] bg-[#60b246] 
                            flex-grow uppercase" onClick={handleClearCart}>Yes, start afresh</button>
                    </div>
                </div>
            </div>,
            document.getElementById('modal-root') 
        )
    )
}

export default Modal
