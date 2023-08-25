import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, computeTotal, setRestaurant } from "../store/cartSlice";
import { CDN_URL } from "../utils/constants";
import Modal from './Modal';
import { BsCaretDownSquare } from "react-icons/bs";

const CategoryItem = ({ data, restaurant }) => {
	const { name, price, defaultPrice, description, imageId, isVeg } = data;
    const selectedRestaurant = useSelector(state => state.cart.selectedRestaurant);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const handleAddItem = () => {
        let dataToAdd;
        if(!price) {
            dataToAdd = {...data, price: defaultPrice};
        } else {
            dataToAdd = {...data};
        }

        // dispatch an action 
        if(selectedRestaurant && selectedRestaurant?.id !== restaurant?.id) {
            setShowModal(true);
        } else if (selectedRestaurant && selectedRestaurant?.id === restaurant?.id) {
            dispatch(addItem(dataToAdd));
            dispatch(computeTotal());
        } else {
            dispatch(setRestaurant(restaurant));
            dispatch(addItem(dataToAdd));
            dispatch(computeTotal());
        }
    }

	return (
		<div className="flex justify-between min-h-[102px] px-2 pt-1 pb-4 my-1 border-b-2 last:border-b-0">
			<div>
                <BsCaretDownSquare className="my-2" color={isVeg ? "#0f8a65" : "#e43b4f"} />
				<h3 className="font-medium text-md text-[#3e4152]">{name}</h3>
				<span className="text-sm text-[#3e4152]">₹{parseFloat(((price || defaultPrice) / 100).toFixed(2))}</span>
				<p className="mt-3 text-sm text-[#282c3f73] max-w-[750px] ">{description}</p>
			</div>
			<div className="relative w-28 h-[120px] py-5">
				{imageId && (
					<img
						className="rounded-md"
						src={`${CDN_URL}${imageId}`}
						alt="item-img"
					/>
				)}
				<button className="p-1 w-16 rounded left-6 font-medium bottom-2 bg-white 
                    absolute border text-sm text-green-600 shadow drop-shadow-[0_3px_8px_#e9e9e2]"
                    onClick={handleAddItem}
                >
					Add +
				</button>
			</div>

            {showModal && (
                <Modal onClose={() => setShowModal(false)} />
            )}
		</div>
	);
};

export default CategoryItem;
