import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";



export async function createProduct(req,res){
       const {title,description,priceAmount,priceCurrency} = req.body;
       const sellerId = req.user.id;
       console.log(req.files);
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
        amount:priceAmount,
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