import { useDispatch, useSelector } from "react-redux";
import { addItem, clearCart, clearRestaurant, computeTotal, removeItem } from "../store/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { CDN_IMG_URL } from "../utils/constants";
import ScrollToTop from "./ScrollToTop";
import { BsCaretDownSquare } from "react-icons/bs";
import launchFireWorks from "../utils/canvasFireworks";


const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const selectedRestaurant = useSelector((store) => store.cart.selectedRestaurant);
    const totalAmount = useSelector((store) => store.cart.totalAmount);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleGoBack = () => {
        navigate(-1);
    };

    const handleAdd = (item) => {
        dispatch(addItem(item));
        dispatch(computeTotal());
    }

    const handleRemove = (item) => {
        if(cartItems.length === 1 && item.itemCount === 1) {
            dispatch(clearRestaurant());
        } 
        dispatch(removeItem(item));
        dispatch(computeTotal());
    }

    const handleSuccessfulOrder = () => {
        alert("Congratulations! Your order is successfully placed");
        launchFireWorks();
    }

    if(!cartItems?.length) {
        return (
            <div className="flex flex-col items-center justify-center pt-[100px] max-w-lg mx-auto h-screen">
                <div className="w-[271px] h-[256px] bg-cover mx-auto bg-no-repeat bg-[url('https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0')]" ></div>
                <h2 className="text-xl font-bold mb-2 mt-10">Your cart is empty</h2>
                <p className="text-sm font-light mb-8">You can go to home page to view more restaurants</p>

                <button 
                    className="py-3 px-6 uppercase font-semibold text-white bg-[#fc8019]"
                    onClick={() => navigate("/")}
                >
                    See Restaurants near you
                </button>
            </div> 
        )
    }

	return (
        <div className="bg-[#e9ecee] pt-[100px] flex justify-center h-screen">
            <div className="w-6/12 bg-white mt-8 m-10 py-5 px-10 min-h-[550px] self-start">
                <h2 className="font-bold text-xl uppercase mt-2 mb-4 text-left">Secure Checkout</h2>
                {/* <button className="text-white bg-red-500 rounded-md p-2 mb-4" onClick={handleClear}>Clear Cart</button> */}

                <div className="mt-6">
                    <Link to={`/restaurant/${selectedRestaurant?.id}`} className="block max-w-max">
                        <div className="flex">
                            <div className="relative w-14 h-14 mr-4 after:absolute after:content-[''] 
                                after:left-0 after:top-0 after:bottom-0 after:right-0 after:bg-blend-overlay after:bg-[#282c3f0d]"
                                >
                                <img className="h-full" src={CDN_IMG_URL + selectedRestaurant?.cloudinaryImageId} alt="res-img" />
                            </div>
                            <div className="relative after:absolute after:left-0 after:bottom-0 after:content-[''] after:bg-[#282c3f] after:w-10 after:h-[3px]">
                                <div className="text-[17px] font-medium text-[#282c3f]">{selectedRestaurant?.name} {"    "}</div>
                                <div className="text-[13px] text-[#686b78]">{selectedRestaurant?.areaName}</div>
                            </div>
                        </div>
                    </Link>
                    <div className="items mt-6 max-h-[350px] overflow-y-auto">
                        {cartItems?.map((item) => (
                            <div key={item?.id} className="flex items-center py-2.5">
                                <BsCaretDownSquare className="mr-3.5" color={item?.isVeg ? "#0f8a65" : "#e43b4f"} />
                                <div className="font-normal text-[#282c3f] text-[14px] text-ellipsis w-56 truncate">{item?.name}</div>
                                <div className="flex items-center ml-4">
                                    <div className="flex border items-center justify-center w-[70px] text-sm h-8 border-[#d4d5d9]">
                                        <span 
                                            className="block text-center font-medium w-1/3 text-base cursor-pointer text-[#9a9ca3]"
                                            onClick={() => handleRemove(item)}
                                        >
                                            -
                                        </span>
                                        <span className="block text-center font-medium w-1/3 text-[#60b246] ">{item?.itemCount}</span>
                                        <span 
                                            className="block text-center font-medium w-1/3 text-[#60b246] cursor-pointer text-base"
                                            onClick={() => handleAdd(item)}
                                        >
                                            +
                                        </span>
                                    </div>
                                    <div className="ml-5 text-[13px] text-[#606375] text-right w-[60px]">₹{parseFloat((item?.itemCount * (item?.price/100)).toFixed(2))}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
            <div className="w-3/12 bg-white self-start min-h-[400px] mt-8 ml-0 mr-10 pt-5 px-8  ">
                <div className="pb-5 border-b-2 border-[#282c3f]">
                    <div className="text-[#282c3f] font-medium">Bill Details</div>
                    <div className="flex items-center text-[13px] font-light my-2.5">
                        <div className="">Item Total</div>
                        <div className="flex-1 text-right">₹{totalAmount}</div>
                    </div>
                    <div className="flex items-center text-[13px] font-light my-2.5">
                        <div className="">Delivery partner fee</div>
                        <div className="flex-1 text-right">₹{19}</div>
                    </div>
                    <hr className="my-5 block" />
                    <div className="flex items-center text-[13px] font-light my-2.5">
                        <div className="">Platform fee</div>
                        <div className="flex-1 text-right">₹{2}</div>
                    </div>
                    <div className="flex items-center text-[13px] font-light my-2.5">
                        <div className="">GST & Restaurant Charges</div>
                        <div className="flex-1 text-right">₹{32}</div>
                    </div>
                </div>
                <div className="flex items-center pt-6 text-[#282c3f] font-semibold">
                    <div className="uppercase">To Pay</div>
                    <div className="flex-1 text-right">₹{totalAmount + 53}</div>
                </div>

                <div className="h-12 text-base flex font-semibold mt-10">
                    <button className="cursor-pointer text-[#60b246] border-2
                        border-[#60b246] flex-grow uppercase" onClick={handleGoBack}>Go Back</button>
                    <span className="w-5"></span>
                    <button className="cursor-pointer text-[#fff] bg-[#60b246] 
                        flex-grow uppercase"
                        onClick={handleSuccessfulOrder}
                    >Confirm Order</button>
                </div>
            </div>

            <ScrollToTop />
        </div>
    )
};

export default Cart;
