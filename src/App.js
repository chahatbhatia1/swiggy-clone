import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'
import Offers from './components/Offers'
import Search from './components/Search'
import Support from './components/Support'
import Cart from './components/Cart'
import ErrorPage from './components/ErrorPage'
import RestaurantDetails from './components/RestaurantDetails'
import FoodCategoryPage from './components/FoodCategoryPage'

import { Provider } from 'react-redux'
import appStore from './store/appStore'
import LandingPage from './components/LandingPage'
import Footer from './components/Footer'


const Grocery = lazy(() => import('./components/Grocery'));


const AppLayout = () => {
	return (
        <Provider store={appStore}>
            <>
                <div className="app">
                    <Header />
                    <Outlet />
                </div>
                <Footer />
            </>
        </Provider>
	)
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: JSON.parse(localStorage.getItem("swgy_userLocation")) !== null ? <AppLayout /> : <LandingPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/landing",
        element: <LandingPage />
      },
      {
        path: "/offers-near-me",
        element: <Offers />
      },
      {
        path: "/search",
        element: <Search />
      },
      {
        path: "/support",
        element: <Support />
      },
      {
        path: "/checkout",
        element: <Cart />
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantDetails />
      },
      {
        path: "/category/:categoryId",
        element: <FoodCategoryPage />
      },
      {
        path: "/grocery",
        element: <Suspense fallback={<h1>Loading ...</h1>}>
                    <Grocery />
                </Suspense>
      },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);