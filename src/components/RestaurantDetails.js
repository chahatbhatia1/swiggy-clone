import { Link, useParams } from 'react-router-dom'
import useRestaurantDetails from '../hooks/useRestaurantDetails';
import RestaurantCategory from './RestaurantCategory';
import ScrollToTop from './ScrollToTop';
import Shimmer from './Shimmer';
import { useSelector } from 'react-redux';
import { IoMdStar } from"react-icons/io"
import { FaClock } from"react-icons/fa"
import { FiShoppingBag } from"react-icons/fi"


const RestaurantDetails = () => {
    const { resId } = useParams()
    const cartItems = useSelector(state => state.cart.items);
    const totalAmount = useSelector(state => state.cart.totalAmount);
    const restaurantData = useRestaurantDetails(resId);



    if(!restaurantData) {
        return <Shimmer />
    }

    const restaurant = restaurantData?.cards[0]?.card?.card?.info;
    const categories = restaurantData?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(category => {
        if(category?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")
            return category
    });

    // console.log(restaurant);
    // console.log(categories);

    return (
        <div className="max-w-[800px] min-h-[800px] mx-auto pt-[120px] pb-[100px]">
            <div className="flex ">
                <div className="flex-1">
                    <h2 className="font-bold text-[1.33rem] text-[#282c3f] mb-2">{restaurant?.name}</h2>
                    <p className="text-[0.83rem] text-[#7e808c] mb-1">{restaurant?.cuisines.join(" ,")}</p>
                    <p className="text-[0.83rem] text-[#7e808c]">{restaurant?.areaName}, {restaurant?.city}</p>
                </div>
                <div className="p-2 font-bold self-start border max-w-[100px] rounded-md text-green-600">
                    <div className="flex items-center justify-center mb-2 pb-2.5 border-b-[1px] border-[#e9e9eb]">
                        <IoMdStar size={21} />
                        <span className="ml-0.5 text-[13px] font-bold">
                            {restaurant?.avgRating}
                        </span>
                    </div>    
                    <div className="font-semibold text-[10px] text-[#8b8d97]">{restaurant?.totalRatingsString}</div>
                </div>
            </div>

            <hr className="border-dashed my-5" />
            
            <div className="flex justify-start">
                <span className="mr-7 font-bold text-sm flex items-center">
                    <FaClock className="mr-2" size={20} />
                    <span>{restaurant?.sla?.deliveryTime} MINS</span>
                </span>
                <span className="font-bold text-sm">
                    {restaurant?.costForTwoMessage}
                </span>
            </div>

            <hr className="my-6 border-t-8" />

            {categories?.map((category, index) => (
                <RestaurantCategory 
                    key={index} 
                    data={category?.card?.card}  
                    restaurant={restaurant}
                />
            ))}
            <ScrollToTop />

            {/* Cart Details */}
            {
                cartItems && cartItems?.length > 0 &&
                <div className="fixed bottom-0 h-14 flex text-white justify-between py-2 px-4 items-center max-w-[800px] min-w-[800px] bg-[#60b246]">
                    <div className="text-sm font-medium">{cartItems?.length} items | ₹{totalAmount}</div>
                    
                    <Link to="/checkout" className="flex items-center uppercase text-sm font-semibold">
                        <span className="mr-2">
                            View Cart
                        </span>
                        <FiShoppingBag size={15} />
                    </Link>
                </div>
            }
        </div>
    )
}

export default RestaurantDetails