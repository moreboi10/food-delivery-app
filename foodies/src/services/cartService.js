import axios from "axios";


// const API_URL = "http://localhost:8080/api";
const API_URL = `${import.meta.env.VITE_API_URL}/api`;

export const addToCart =async (foodId,token) =>{
    try {
       await axios.post(
      API_URL+"/cart",
      { foodId },
      { headers: { Authorization: `Bearer ${token}` }}
    );
    
    } catch (error) {
        
        console.log("error while  adding quantity to the cart ",error);
    }
}

export const removeFromCart =async (foodId,token) =>{
    try {
        await axios.post(
      API_URL+"/cart/remove",
      { foodId },
      { headers: { Authorization: `Bearer ${token}` }}
    );  
    } catch (error) {
         
        console.log("error while  removeing quantity from cart ",error);
    }
}

export const getCartData =async (token) =>{
    try {
        const response = await axios.get(API_URL+"/cart",{ headers: { Authorization: `Bearer ${token}` }});
        return response.data.items;
    } catch (error) {
         
        console.log("unable to load data : ",error);
    }
}


