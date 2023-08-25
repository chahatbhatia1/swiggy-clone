import React from 'react'
import { foodCategoryMap } from '../utils/mockData'
//import { Link } from 'react-router-dom'

const FoodCategory = () => {
  return (
    <div className="h-[256px]">
        <h1 className="font-bold text-2xl mb-2">What's on your mind?</h1>

        <div>
            <div className="w-full overflow-x-auto flex no-scrollbar">
                {Object.keys(foodCategoryMap).map((key) => (
                    <div key={key} className="flex-[0_0_auto] cursor-pointer h-[180px] w-[144px] mx-[12px]">
                        <img 
                            src={foodCategoryMap[key]?.imgUrl} 
                            className=" object-cover last:pr-0"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default FoodCategory