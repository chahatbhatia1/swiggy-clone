import React from 'react'
import { bannerList } from "../utils/mockData"

const Banner = () => {
  return (
    <div className="h-[344px] p-2">
        <h1 className="mt-5 font-bold text-2xl mb-2">Best offers for you</h1>

        <div>
            <div>
                <div className="flex overflow-scroll no-scrollbar">
                    {bannerList.map((banner) => (
                        <img 
                            key={banner.id} 
                            src={banner.imgUrl} 
                            className="h-full block w-[375px] m-3 first:ml-0 last:mr-0 cursor-pointer"
                            alt="offer-banner" 
                            loading="lazy"
                        />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Banner