import mongoose, { Schema } from "mongoose";
import { mongoInsertDB } from "../config/db.config.js";

// TODO: 수정
const portfolioDetailSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    onlyMoney: Object,
    value_with_tax: Object,
    value_without_tax: Object,
    result_with_tax: Object,
    result_without_tax: Object,
    recieve_with_tax: Array,
    recieve_without_tax: Array,
    recent_etf_codes: Array,
    username: String,
    created_date: Date,
    portfolio_name: String
})

export default class PortfolioDetailRepository {
    portfolioDetailModel
    snowDetailModel
    constructor(){
        this.portfolioDetailModel = mongoInsertDB.model('portfolio_detail', portfolioDetailSchema, 'portfolio_detail')
        this.snowDetailModel = mongoInsertDB.model('snowpick_detail', portfolioDetailSchema, 'snowpick_detail')
    }

    async getSnowDetail(portfolioIdentifierModel) {
        const { createdDate, username } = portfolioIdentifierModel

        return await this.snowDetailModel.findOne(
            {
                created_date: new Date(createdDate),
                username: username
            }
        )
    }

    async getDetailedInfo(portfolioIdentifierModel) {
        const { createdDate, username } = portfolioIdentifierModel

        return await this.portfolioDetailModel.findOne(
            {
                created_date: new Date(createdDate),
                username: username
            }
        )
    }
}