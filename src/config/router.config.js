import express from 'express'
import commonRouter from '../controller/common.controller.js';
import portfolioRouter from '../controller/portfolio.controller.js';
import productRouter from '../controller/product.controller.js';

const routerConfig = express.Router()

routerConfig.use('/common', commonRouter)
routerConfig.use('/product', productRouter)
routerConfig.use('/portfolio', portfolioRouter)

export default routerConfig