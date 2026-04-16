import axios from "axios"

const productApiInstance = axios.create({
    baseURL: "/api/product",
    withCredentials: true,
})


export async function createProduct(formData){
        const response = await productApiInstance.post("/create", formData)
        console.log(response)
        return response.data;
}
export async function getSellerProducts() {
    const response = await productApiInstance.get("/getsellerproducts")
    console.log(response)
    return response.data;
}