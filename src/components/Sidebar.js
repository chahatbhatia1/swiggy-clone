import React, { createRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { RxCross2 } from "react-icons/rx";
import { MdOutlineMyLocation } from "react-icons/md";
import { useMatch } from 'react-router-dom';
import { CORS_PROXY_URL } from '../utils/constants';

const Sidebar = ({show, onClose}) => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCancel, setShowCancel] = useState(false);
    const inputRef = createRef();
    const restroMatch = useMatch("/restaurant/:resId");

    useEffect(() => {
        setLocations([]);
        inputRef.current.value = "";
    }, [show]);
    

    const cancelSearch = () => {
        setShowCancel(false);
        setLocations([]);
        inputRef.current.value = "";
    }

    const searchLocations = async (searchQuery) => {
        if(!searchQuery) 
            return;

        setShowCancel(true);
        setLocations([]);
        const res = await fetch(`${CORS_PROXY_URL}https://www.swiggy.com/dapi/misc/place-autocomplete?input=${searchQuery}&types=`)
        const {data} = await res.json();

        setLocations(data);
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

    const debouncedSearch = debounce(searchLocations, 250);

    const handleFetchLatLong = async (placeId) => {
        setLoading(true);

        const res = await fetch(`${CORS_PROXY_URL}https://www.swiggy.com/dapi/misc/address-recommend?place_id=${placeId}`);
        const {data} = await res.json();

        if(data?.length > 0) {
            const { place_id, formatted_address, geometry: { location: { lat, lng } } } = data[0];

            const userLocation = {
                placeId: place_id,
                address: formatted_address,
                lat,
                lng
            };
            localStorage.setItem("swgy_userLocation", JSON.stringify(userLocation));
            localStorage.setItem("swgy_cartItems", JSON.stringify([]));
            localStorage.setItem("swgy_selectedRestaurant", JSON.stringify(null));
            localStorage.setItem("swgy_totalAmount", JSON.stringify(0));

            if(restroMatch) {
                window.location.href = '/';
            } else {
                window.location.reload();
            }
        }
    }

    const fetchLocationByGPS = () => {
        let success = async (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
                );
                const { place_id, address: { city, state, country } } = await response.json();
                
                const userLocation = {
                    placeId: place_id,
                    address: `${city}, ${state}, ${country}`,
                    lat,
                    lng
                };
                localStorage.setItem("swgy_userLocation", JSON.stringify(userLocation));
                localStorage.setItem("swgy_cartItems", JSON.stringify([]));
                localStorage.setItem("swgy_selectedRestaurant", JSON.stringify(null));
                localStorage.setItem("swgy_totalAmount", JSON.stringify(0));

                window.location.reload();
            } catch (error) {
                alert('Error fetching address:', error);
                setLoading(false);
            }            
        }

        let error = () => {
            alert("Unable to retrieve your location");
            setLoading(false);
        }

        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
        } else {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    return (
        createPortal(
            <div className={`fixed top-0 left-0 right-auto h-full overflow-y-scroll bg-white z-[10001] 
            transition-transform ${ show ? 'translate-x-0' : 'translate-x-[-100%]'} duration-[0.3s] ease-out`}>
                <div className="relative h-screen">
                    <div className="w-[537px] pr-[40px] pl-[135px]">
                        <div className="mb-[30px] pt-[32px] flex justify-start">
                            <RxCross2 onClick={onClose} size={24} color="#3d4152" className="cursor-pointer" />
                        </div>
                        <div className="relative pb-[20px]">
                            <div className="block relative border border-[#d4d5d9]">
                                <input 
                                    type="text" 
                                    name="search-location"
                                    placeholder="Search for area, street name..." 
                                    ref={inputRef}
                                    maxLength={30}
                                    className="w-full h-[50px] pr-[72px] pl-5 outline-0 border-0 
                                    overflow-hidden text-ellipsis whitespace-nowrap font-medium"
                                    onChange={(e) => debouncedSearch(e.target.value)}
                                />
                                {showCancel && <button 
                                    className="absolute right-3.5 top-3.5 cursor-pointer text-[#fc8019] text-sm font-normal"
                                    onClick={cancelSearch}
                                >
                                    Cancel
                                </button>}
                            </div>
                            {locations?.length > 0 ? (
                                <div className="">
                                    {locations?.map(location => (
                                        <button 
                                            key={location?.place_id} 
                                            className="cursor-pointer text-[#535665] min-h-[40px] font-normal w-full hover:text-[#fc8019] 
                                            px-6 py-5 border-dashed border-b-[1px] text-left text-ellipsis border-[#bebfc5] text-base overflow-hidden bg-white"
                                            onClick={() => handleFetchLatLong(location?.place_id)}
                                        >
                                                {location?.description}
                                        </button>
                                    ))}                             
                                </div>
                            ): (
                                <div className="border mt-5 border-[#d4d5d9]" onClick={fetchLocationByGPS}>
                                    <div className="relative cursor-pointer">
                                        <div className="table table-fixed px-6 py-5">
                                            <div className=" table-cell w-8 text-left text-lg text-[#535665] pt-[4px] pl-1">
                                                <MdOutlineMyLocation size={20} />
                                            </div>
                                            <div className="table-cell align-middle">
                                                <div className="text-base text-[#282c3f] font-medium">
                                                    {loading ? "Fetching current location..." : "Get Current Location"}
                                                </div>
                                                <div className="pt-1 text-[13px] leading-[1.3] text-[#93959f]">Using GPS</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            ,
            document.getElementById("sidebar-root")
        )
    )
}

export default Sidebar