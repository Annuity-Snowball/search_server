import express from 'express'
import portfolioRouter from '../controller/portfolio.controller.js';
import productRouter from '../controller/product.controller.js';

const routerConfig = express.Router()

routerConfig.use('/product', productRouter)
routerConfig.use('/portfolio', portfolioRouter)

export default routerConfig