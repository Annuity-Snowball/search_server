import express from 'express'
import PortfolioService from '../service/portfolio.service.js'
import { PortfolioIdentifierModel, SearchRequestModel } from '../model/portfolioSearch.model.js'

const router = express.Router()

class PortfolioController {
    portfolioService
    constructor(){
        this.portfolioService = new PortfolioService()
    }

    async search(req, res) {
        const searchRequestModel = new SearchRequestModel(req.body)
        const result = await this.portfolioService.search(searchRequestModel)
        res.send(result)
    }

    async detail(req, res) {
        const portfolioIdentifierModel = new PortfolioIdentifierModel(req.body)
        const result = await this.portfolioService.getPortfolioDetailInfo(portfolioIdentifierModel)
        res.send(result)
    }

    async getUserPortfolioList(req, res) {
        const username = req.params.username
        const result = await this.portfolioService.getUserPortfolioList(username)
        res.send(result)
    }

    async hit(req, res) {
        const portfolioIdentifierModel = new PortfolioIdentifierModel(req.body)
        const result = await this.portfolioService.hitPortfolio(portfolioIdentifierModel)
        res.send(result)
    }

    async numbers(req, res) {
        const numberOfPortfolio = await this.portfolioService.numbers()
        const result = {
            docs: numberOfPortfolio
        }
        res.send(result)
    }

    async recentPortfolios(req, res) {
        const result = await this.portfolioService.getRecentPortfolios()
        res.send(result)
    }

    async popularPortfolios(req, res) {
        const result = await this.portfolioService.getPopularPortfolios()
        res.send(result)
    }
}

const portfolioController = new PortfolioController()

router.post('/search', async (req, res, next) => {
    portfolioController.search(req, res)
})

router.post('/detail', async (req, res, next) => {
    portfolioController.detail(req, res)
})

router.post('/hit', async (req, res, next) => {
    portfolioController.hit(req, res)
})

router.get('/user/:username', async (req, res, next) => {
    portfolioController.getUserPortfolioList(req, res)
})

router.get('/number', async (req, res, next) => {
    portfolioController.numbers(req, res)
})

router.get('/recent', async (req, res, next) => {
    portfolioController.recentPortfolios(req, res)
})

router.get('/popular', async (req, res, next) => {
    portfolioController.popularPortfolios(req, res)
})

export default router