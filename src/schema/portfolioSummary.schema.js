import mongoose, { Schema } from "mongoose";
import { mongoInsertDB } from "../config/db.config.js";

const portfolioSummarySchema = new Schema({
    _id: mongoose.Types.ObjectId,
    id: Number,
    username: String,
    name: String,
    startDate: String,
    endDate: String,
    rebalancingDuration: Number,
    inputMoney: Number,
    startMoney: Number,
    inputWay: Number,
    strategyNumber: Number,
    strategies: Array,
    hits: Number,
    created_date: Date,
    profit: Number,
    profit_ratio: Number,
    montly_profit_ratio: Number,
    mdd: Number,
    daily_lowest_profit_ratio: Number
})

export default class PortfolioSummaryRepository {
    portfolioSummaryModel
    snowPickSummaryModel
    constructor(){
        this.portfolioSummaryModel = mongoInsertDB.model('portfolio_summary', portfolioSummarySchema, 'portfolio_summary')
        this.snowPickSummaryModel = mongoInsertDB.model('snowpick_summary', portfolioSummarySchema, 'snowpick_summary')
    }

    async getSnowList(){
        return await this.snowPickSummaryModel.find({})
    }

    async search(searchRequestModel) {
        const { ProfitRatio, mdd, dailyLowestProfitRatio } = searchRequestModel;

        return await this.portfolioSummaryModel.aggregate([
            {
                $match: {
                    profit_ratio: { $gte: ProfitRatio },
                    mdd: { $lte: mdd },                 
                    daily_lowest_profit_ratio: { $gte: dailyLowestProfitRatio }
                }
            },
            {
                $limit: 10
            }
        ]);
    }

    async hit(portfolioIdentifierModel) {
        try {
            const { createdDate, username } = portfolioIdentifierModel

            await this.portfolioSummaryModel.findOneAndUpdate(
                {
                    created_date: new Date(createdDate),
                    username: username
                },
                {
                    $inc: { hits: 1 }
                },
                {
                    new: true,
                    upsert: false
                }
            )

            return "success";
        } catch (error) {
            console.error("Error updating hits:", error)
            throw "fail"
        }
    }

    async numberOfDocs() {
        try {
            return await this.portfolioSummaryModel.countDocuments({});
        } catch (error) {
            console.error("Error counting documents:", error);
            throw error;
        }
    }

    async getUserPortfolioList(username) {
        return await this.portfolioSummaryModel.find(
            {
                username: username
            }
        )
    }

    async getRecentPortfolios() {
        return await this.portfolioSummaryModel.find({})
            .sort({ created_date: -1 })
            .limit(5);
    }

    async getPopularPortfolios() {
        return await this.portfolioSummaryModel.find({})
        .sort({ hits: -1 })
        .limit(5);
    }
}