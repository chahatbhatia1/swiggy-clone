import React, { useState } from "react";
import CategoryItem from "./CategoryItem";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";

const RestaurantCategory = ({ data, restaurant }) => {
    const [showItems, setshowItems] = useState(true);
	const { title, itemCards } = data

    const handleShowToggle = () => setshowItems(showItems => !showItems);
 
	return (
		<div className="border-b-4 ">
			<div 
				className="flex justify-between font-bold cursor-pointer px-2 py-4"
				onClick={handleShowToggle}
			>
				<span>{title} ({itemCards?.length})</span>
				{ showItems ? <PiCaretUpBold /> : <PiCaretDownBold /> }
			</div>

			{
				<div className={`collapsible transition-[height] duration-300 ${
                    showItems ? 'h-[auto]' : 'h-0'
                } `}>
                    {showItems && itemCards?.map((item) => (
                        <CategoryItem
                            key={item?.card?.info?.id} 
                            data={item?.card?.info} 
                            restaurant={restaurant} 
                        />
                    ))}
                </div>
			}
				
		</div>
	);
};

export default RestaurantCategory;
