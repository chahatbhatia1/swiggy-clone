import React, { useRef, useState } from 'react'
import { CDN_IMG_URL, CORS_PROXY_URL } from '../utils/constants';
import SearchShimmer from './SearchShimmer';

const Search = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();

    const searchRestaurants = async (searchQuery) => {
        if(!searchQuery) 
            return;

        setLoading(true);
        setSuggestions([]);
        const res = await fetch(`${CORS_PROXY_URL}https://www.swiggy.com/dapi/restaurants/search/suggest?lat=26.4498954&lng=74.6399163&str=${searchQuery}&trackingId=null`)
        const {data} = await res.json();

        const suggestions = data?.suggestions;

        setSuggestions(suggestions);
        setLoading(false);
    }

    const debounce = (callback, delay) => {
        let timer;

        return function(...args) {
            inputRef.current = args;
            if(timer) clearTimeout(timer);
            timer = setTimeout(() => {
                callback(args);
            }, delay);
        }
    } 

    const debouncedSearch = debounce(searchRestaurants, 250);

    return (
        <div className="mt-[130px] max-w-[1180px] mx-auto">
            <div className="flex justify-center">
                <input 
                    type="search" 
                    ref={inputRef}
                    name="search" 
                    placeholder="Search for restaurants" 
                    className="outline-0 border rounded-sm border-[#282c3f4d] h-[48px] px-4 py-2 min-w-[800px]"
                    onChange={(e) => debouncedSearch(e.target.value)}
                />
            </div>
            <div className="mt-[20px] max-w-[800px] mx-auto">
                { loading && <SearchShimmer />}
                {suggestions?.length > 0 && suggestions?.map((suggestion) => (
                    <button key={suggestion?.cloudinayId} className="my-1 block rounded-sm w-full">
                        <div className="flex py-2 hover:bg-[#f2f6fc]">
                            <div className="w-16 mr-5">
                                <img src={CDN_IMG_URL + suggestion?.cloudinaryId} className="p-0 rounded-md" alt="res-img" />
                            </div>
                            <div className="flex flex-col justify-center items-start">
                                <h3 className="font-normal text-sm">{suggestion?.text}</h3>
                                <p className="font-extralight text-sm">{suggestion?.tagToDisplay}</p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Search