import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { foodCategoryMap } from '../utils/mockData';
import RestaurantCard from './RestaurantCard';
import ScrollToTop from './ScrollToTop';

const FoodCategoryPage = () => {
    const { categoryId } = useParams();
    const [category, setCategory] = useState(foodCategoryMap[categoryId]);
    

    return (
        <div className="mt-[80px] max-w-[1200px] mx-auto">
            <div className="pt-14">
                <h1 className="text-[40px] font-bold">{category?.name}</h1>
                <h2 className="text-lg font-light mt-2">{category?.description}</h2>
            </div>

            <div className="pt-10">
                <h3 className="text-[28px] font-bold">{category?.cards?.length} Restaurants</h3>
                <hr className="my-2" />

                <div className="pt-8 grid grid-cols-4 gap-8">
                    {
                        category?.cards?.length > 0 ? 
                        category?.cards?.map((card) => (
                            <Link key={card?.id} to={`/restaurant/${card?.id}`} 
                            className="transition-all duration-100 hover:scale-95" 
                            >
                                <RestaurantCard resData={card} />
                            </Link>
                        )) : 
                        <h2>No restaurants here in this category...</h2>
                    }
                </div>
            </div>

            <ScrollToTop />
        </div>
    )
}

export default FoodCategoryPage