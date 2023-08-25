import React from 'react'

const Shimmer = () => {
  return (
        <div className="pt-[80px]">
            <div className="h-[344px] bg-[#171a29] flex flex-col justify-center items-center">
                <div className="relative w-[80px] h-[80px] ">
                    <div className="w-full h-full rounded-full bg-white absolute bg-gradient-to-b 
                        from-gray-200 to-slate-800 to-50% after:absolute after:rounded-full after:bg-[#171a29]
                        after:content-['*'] after:w-[72px] after:h-[72px] after:top-1 after:left-1 after:block 
                        animate-spin">
                    </div>
                    <img 
                        className="w-[40px] z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
                        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/fries_ivyqs5" 
                        alt="carousel" 
                    />
                </div>
                <div className="mt-8 font-light tracking-wide text-[#cbd5e1] text-[26px]">Looking for great food near you ...</div>
            </div>
            <div className="max-w-[1080px] grid grid-cols-4 gap-7 mx-auto pt-[76px]">
                {
                    Array.from({ length: 8 }, (_, index) => (
                        <div key={index} className="h-[256px]">
                            <div className="bg-[#eef0f5] h-[166px]"></div>
                            <div className="bg-[#eef0f5] h-[10px] mt-5 w-2/3"></div>
                            <div className="bg-[#eef0f5] h-[10px] mt-5 w-1/4"></div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Shimmer