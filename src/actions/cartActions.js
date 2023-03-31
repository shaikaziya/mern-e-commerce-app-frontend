import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_RESET, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS, WISHLIST_ADD_ITEM, WISHLIST_REMOVE_ITEM } from "../constants/cartConstants";
import { api_url } from "../api/api.js";

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`${api_url}/api/products/${id}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            productId: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM, payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const addToWishlist = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`${api_url}/api/products/${id}`)
    console.log(data)
    dispatch({
        type: WISHLIST_ADD_ITEM,
        payload: {
            productId: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })
    localStorage.setItem('wishlist', JSON.stringify(getState().cart.wishlist));
}

export const removeFromWishlist = (id) => (dispatch, getState) => {
    dispatch({
        type: WISHLIST_REMOVE_ITEM, payload: id
    })
    localStorage.setItem('wishlist', JSON.stringify(getState().cart.wishlist));
}

export const saveShippingAddress = (data) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })
    localStorage.setItem('paymentMethod', JSON.stringify(data));
}

export const cartReset = () => async (dispatch) => {
    localStorage.setItem('cartItems', JSON.stringify([]))
    dispatch({ type: CART_RESET });
}
