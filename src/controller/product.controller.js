import express from 'express'
import ProductService from '../service/product.service.js'
import { InfoListRequestModel, PriceListRequestModel } from '../model/productSearch.model.js'

const router = express.Router()

class ProductController {
    productService
    constructor(){
        this.productService = new ProductService()
    }

    async searchProductList(req, res) {
        const request = new InfoListRequestModel(req.body)
        const result = await this.productService.searchInfoList(request)
        res.send(result)
    }

    async getPriceList(req, res) {
        const etfCode = new PriceListRequestModel(req.params)
        const result = await this.productService.getPriceList(etfCode)
        res.send(result)
    }

    async getComment(req, res) {
        const etfCode = req.params.etfCode
        const result = await this.productService.getComment(etfCode)
        res.send(result)
    }
}

const productController = new ProductController()


// get product search result
router.post('/searchInfoList', async (req, res, next) => {
    productController.searchProductList(req, res)
})

router.get('/priceList/:etfCode/:benefitMonth', async (req, res, next) => {
    productController.getPriceList(req, res)
})

// get product comment
router.get('/comment/:etfCode', async (req, res, next) => {
    productController.getComment(req, res)
})

export default router