import Router from 'express';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import { validateCreateProduct } from '../validators/product_validator.js';
import { createProduct,getSellerProducts } from '../controllers/product.controller.js';
import multer from 'multer';
const router = Router();

const upload = multer({
    
    storage:multer.memoryStorage(),
    limits:{fileSize:5 * 1024 * 1024} // 5MB file size limit

})


router.post('/create',authenticateUser,upload.array('images', 5),createProduct)
router.get('/getsellerproducts',authenticateUser,getSellerProducts)

export default router;