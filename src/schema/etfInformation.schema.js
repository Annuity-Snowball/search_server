import mongoose, { Schema } from "mongoose";
import { mongoDataDB } from "../config/db.config.js";

const etfInformationSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    etf_code: Number,
    start_date: Date,
    start_year: Number,
    start_month: Number,
    start_day: Number,
    etf_kr_full_name: String,
    etf_kr_name: String,
    etf_en_name: String,
    base_index: String,
    follow_multiple_category: String,
    base_market_category: String,
    base_asset_catogory: String,
    etf_company: String,
    etf_cu: Number
})

export default class EtfInformationRepository {
    etfInformationModel
    constructor(){
        this.etfInformationModel = mongoDataDB.model('etf_information', etfInformationSchema, 'etf_information')
    }

    async getEtfCommentInfo(etfCode){

        return this.etfInformationModel.aggregate([
            {
                $match: {
                    etf_code: etfCode
                }
            },
            {
                $project: {
                    _id: 0,
                    etfName: "$etf_kr_name",
                    etfCompany: "$etf_company",
                    baseIndex: "$base_index",
                    category: "$follow_multiple_category"
                }
            }
        ])
    }
}
