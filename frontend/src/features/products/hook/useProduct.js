import { createProduct,getSellerProducts } from "../service/product.api";
import { setSellerProducts } from "../state/product.slice";
import {useDispatch} from "react-redux"


export function useProduct(){
    const dispatch = useDispatch();

    async function handleCreateProduct(formdata){
          try {
            const response = await createProduct(formdata);
            dispatch(setSellerProducts(response.products));
            return response.products

          } catch (error) {
            console.error("Error creating product:", error);
          
          }
    }


async function handleGetSellerProducts(){
    try {
        const response = await getSellerProducts();
        dispatch(setSellerProducts(response.products));
        return response.products
    } catch (error) {
        console.error("Error fetching seller products:", error);
        throw error;    
    }

}


return {
    handleCreateProduct,
    handleGetSellerProducts
}
}