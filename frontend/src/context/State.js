import axios from 'axios'
import { useReducer, useEffect } from 'react'
import StateContext from './Context'
import StateReducer from './Reducer'


import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,

    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
  } 
  from './Constants'


 


const State = ({ children }) => {

    const cartItemsFromStorage = localStorage.getItem('cartItems') ?
        JSON.parse(localStorage.getItem('cartItems')) : []

    const initialState = {
        productlist : {products :[]},
        productDetails : {reviews:[],product:{}},  
        cart : {cartItems : cartItemsFromStorage},
        
    
    }  

    const [state, dispatch] = useReducer(StateReducer, initialState)



    const listProducts =  async() => {
        try{

            dispatch({type: PRODUCT_LIST_REQUEST })            

            const {data} = await axios.get('/restapi/products/')            

            dispatch({
                type: PRODUCT_LIST_SUCCESS,
                payload: data })
        }
        catch(error){

            dispatch({
                type: PRODUCT_LIST_FAIL,
                payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message, 
            })

        }
    }



    const listProductDetails = async(id) => {
        try{

            console.log("inside list product details")

            dispatch({type: PRODUCT_DETAILS_REQUEST })

            function delay(n){
                return new Promise(function(resolve){
                    setTimeout(resolve,n*1000);
                });
            }
            
            async function myAsyncFunction(){
                //Do what you want here 
                console.log("Before the delay")                
            
                await delay(1);

            //     const {data} = await axios.get(`/restapi/products/${id}`)
            
            //     console.log(id)
            //     dispatch({
            //     type: PRODUCT_DETAILS_SUCCESS,
            //     payload: data })
            
                console.log("After the delay")
                //Do what you want here too
            
            }
            
            myAsyncFunction();

            const {data} = await axios.get(`/restapi/products/${id}`)
            
            console.log(id)
            dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload: data })           

            
        }
        catch(error){

            dispatch({
                type: PRODUCT_DETAILS_FAIL,
                payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message, 
            })

        }
    }


    const addToCart = async(id,qty) => {
        
        const {data} = await axios.get(`/restapi/products/${id}`)

        console.log("add to cart is called", qty)
        

        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock : data.countInStock,
                qty

            }
        })

        // console.log(state.cart)

        localStorage.setItem('cartItems', JSON.stringify(state.cart.cartItems))

    }

    
    const removeFromCart = (id) => {

        dispatch({
            type : CART_REMOVE_ITEM,
            payload: id,
        })

        localStorage.setItem('cartItems', JSON.stringify(state.cart.cartItems))


    }


    return(
        <StateContext.Provider value ={{
            productlist : state.productlist,
            productDetails: state.productDetails,
            cart : state.cart,
            listProducts,
            listProductDetails,
            addToCart,
            removeFromCart,
        }}>

            {children}
        </StateContext.Provider>
    )

}

export default State