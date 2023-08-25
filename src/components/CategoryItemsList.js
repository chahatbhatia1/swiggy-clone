import React from "react";
import CategoryItem from "./CategoryItem";

const CategoryItemsList = ({ items }) => {
	// console.log(items);

	return (
			<div className="collapsible">
				{items.map((item) => (
                    <CategoryItem key={item?.card?.info?.id} data={item?.card?.info} item={item} />
				))}
			</div>
	);
};

export default CategoryItemsList;
