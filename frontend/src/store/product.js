// import {create} from "zustand";

// export const useProductStore = create((set) => ({
//     products: [],
//     setProducts: (products) => set({ products}),
//     createProduct : async (newProduct) => {
//         if( !newProduct.name || !newProduct.image || !newProduct.price){
//             return {success: false, message:"Please fill in all the fields"}
//         }
//         const res = await fetch("/api/products", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(newProduct),
//         });

//         const data = await res.json();
//         set((state) => ({products: [...state.products, data.data]}))
//         return {success: true, message:"Product created successfully"}
        
//     },
// }));

import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),

    createProduct: async (newProduct) => {
        // Validate input
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Please fill in all the fields" };
        }

        try {
            const res = await fetch("/api/products/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", //This header tells the server that the request body contains JSON data. It helps the server understand how to parse the incoming data.
                },
                body: JSON.stringify(newProduct),
                /*The body property contains the data to be sent with the request.
JSON.stringify(newProduct): Converts the newProduct object to a JSON string. This is necessary because the fetch API sends the request body as a string, and the server expects data in JSON format. The newProduct object contains the product details that need to be added.*/
            });

            // Check if the response is successful
            if (!res.ok) {
                const errorData = await res.json(); // If the server sends a response with error message
                return { success: false, message: errorData?.message || "Failed to create product" };
            }

            const data = await res.json();

            // Update the products in the store
            set((state) => ({ products: [...state.products, data.data] }));

            return { success: true, message: "Product created successfully" };
        } catch (error) {
            // Handle any other errors (e.g., network issues)
            return { success: false, message: "An error occurred while creating the product" };
        }
    },

    fetchProducts: async () => {
        const res = await fetch("/api/products/getProducts");
        const data= await res.json();
        set({products: data.data});
    },

    deleteProduct: async (pid) => {
        const res = await fetch(`api/products/delete/${pid}`,{
            method: "POST",
        });
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message};

        //this updates the ui immediately without refreshing the page
        set(state => ({ products: state.products.filter(product => product._id !== pid)}));
        return {success: true, message: data.message};
    },

    updateProduct : async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/update/${pid}`, {
            method: 'PUT',
            headers :{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message };

        //update the ui immediately
        set(state => ({ products: state.products.map((product => (product._id === pid ? data.data : product))),
        }));

        return { success: true, message: data.message };
    }
}));
