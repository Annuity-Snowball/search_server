import PortfolioSummaryRepository from "../schema/portfolioSummary.schema.js"
import PortfolioDetailRepository from "../schema/portfolioDetail.schema.js"

export default class PortfolioService {
    portfolioSummaryRepository
    portfolioDetailRepository
    constructor(){
        this.portfolioSummaryRepository = new PortfolioSummaryRepository()
        this.portfolioDetailRepository = new PortfolioDetailRepository()
    }

    async search(searchRequestModel){
        const result = await this.portfolioSummaryRepository.search(searchRequestModel)
        const transformedResults = result.map(result => ({
            username: result.username,
            createdDate: result.created_date,
            strategyNumber: result.strategyNumber,
            profit: result.profit,
            profit_ratio: result.profit_ratio,
            period: this.calculateMonths(result.startDate, result.endDate)
        }));
        return transformedResults
    }

    async getPortfolioDetailInfo(portfolioIdentifierModel) {
        const result = await this.portfolioDetailRepository.getDetailedInfo(portfolioIdentifierModel)
        return result
    }

    async getUserPortfolioList(username) {
        const result = await this.portfolioSummaryRepository.getUserPortfolioList(username)
        const transformedResults = result.map(result => ({
            username: result.username,
            createdDate: result.created_date,
            strategyNumber: result.strategyNumber,
            profit: result.profit,
            profit_ratio: result.profit_ratio,
            period: this.calculateMonths(result.startDate, result.endDate)
        }));
        return transformedResults
    }

    async hitPortfolio(portfolioIdentifierModel) {
        const result = await this.portfolioSummaryRepository.hit(portfolioIdentifierModel)
        return result
    }

    async numbers(){
        return await this.portfolioSummaryRepository.numberOfDocs()
    }

    async getRecentPortfolios(){
        const result = await this.portfolioSummaryRepository.getRecentPortfolios()
        const transformedResults = result.map(result => ({
            username: result.username,
            createdDate: result.created_date,
            strategyNumber: result.strategyNumber,
            profit: result.profit,
            profit_ratio: result.profit_ratio,
            period: this.calculateMonths(result.startDate, result.endDate)
        }));
        return transformedResults
    }

    async getPopularPortfolios(){
        const result = await this.portfolioSummaryRepository.getPopularPortfolios()
        const transformedResults = result.map(result => ({
            username: result.username,
            createdDate: result.created_date,
            strategyNumber: result.strategyNumber,
            profit: result.profit,
            profit_ratio: result.profit_ratio,
            period: this.calculateMonths(result.startDate, result.endDate)
        }));
        return transformedResults
    }

    calculateMonths(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        const startYear = start.getFullYear();
        const endYear = end.getFullYear();
        const startMonth = start.getMonth();
        const endMonth = end.getMonth();
    
        const months = (endYear - startYear) * 12 + (endMonth - startMonth);
    
        return months + 1;
    }
}