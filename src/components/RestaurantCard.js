import React from 'react'
import { MdStars } from "react-icons/md"

import { CDN_URL } from "../utils/constants"

const RestaurantCard = ({resData}) => {
	const {name, cuisines, avgRating, cloudinaryImageId, sla: { deliveryTime }, aggregatedDiscountInfoV3} = resData;
    let discountInfo = "";

    if(aggregatedDiscountInfoV3) {
        const { header, subHeader } = aggregatedDiscountInfoV3;
        discountInfo = (header ? header + " " : "") + (subHeader ? subHeader : "");
    }

	return (
		<div className="p-0 text-sm h-full">
            <div className="relative mb-2">
                <img className="rounded-2xl" 
                    src={CDN_URL + cloudinaryImageId} 
                    alt="res-img" 
                />
                <div className="absolute bottom-0 left-0 right-0 h-[81px] text-left grid content-end px-3 pb-2 
                    bg-gradient-to-b from-[#1b1e2400] to-[#1b1e24] rounded-2xl">
                    <div className="font-bold text-[21px] w-auto whitespace-nowrap text-[#ffffffeb]">
                        {discountInfo}
                    </div>
                </div>
            </div>
			<h3 className="font-semibold text-lg truncate overflow-hidden whitespace-nowrap">{name}</h3>
            <div className="flex">
                <MdStars className="align-middle" size={22} color="#0f8a65" /> 
                <span className="ml-1 text-base">{avgRating}</span>
            </div>
			<div className="truncate overflow-hidden whitespace-nowrap text-base text-[#02060c99]">{cuisines?.join(", ")}</div>
			<div className="text-base text-[#02060c99]">{deliveryTime} { deliveryTime?.toString()?.length <= 3 && "mins"}</div>
			{/* <p>{costForTwo}</p> */}
		</div>
	)
}

// Higher Order Component
export const withPromoted = (RestaurantCard) => {
    return (props) => {
        return (
            <div className="h-full">
                <label className="absolute p-2 m-2 text-black font-bold bg-yellow-300 rounded-lg text-xs">Promoted</label>
                <RestaurantCard {...props} />
            </div>
        )
    }
}

export default RestaurantCard