import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";



export async function createProduct(req,res){
       const {title,description,priceAmount,priceCurrency} = req.body;
       console.log(title,description,priceAmount,priceCurrency);
       const sellerId = req.user.id;
       const images = await Promise.all(
       req.files.map(async (file) => {
             return await uploadFile({buffer:file.buffer,
                fileName:file.originalname
             })
       })
)

  const product =  await productModel.create({
    title,
    description,
    price:{
        amount:Number(priceAmount),
        currency:priceCurrency
        },
        seller:sellerId,
        images
  })


  res.status(201).json({
    success:true,
    message:"Product Created Successfully",
    product
  })


}

export async function getSellerProducts(req,res){
    const sellerId = req.user.id;
    const products = await productModel.find({seller:sellerId})
    if(products.length === 0){
        return res.status(404).json({
            success:false,
            message:"No products found for this seller"
        })
    }
    res.status(200).json({
        success:true,
        message:"Products found for this seller",
        products
    })
}