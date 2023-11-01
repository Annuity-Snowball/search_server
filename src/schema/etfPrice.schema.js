import mongoose, { Schema } from "mongoose";
import { mongoDataDB } from "../config/db.config.js";

const etfPriceSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    etf_code: Number,
    etf_name: String,
    etf_price: Number,
    etf_total_price: Number,
    etf_date: Date,
    management_company: String
})

export default class EtfPriceRepository {
    etfPriceModel
    constructor(){
        this.etfPriceModel = mongoDataDB.model('etf_price', etfPriceSchema, 'etf_price')
    }

    async getInfoList(infoListRequestModel) {

        const date = new Date(getDate(infoListRequestModel.benefitMonth))

        const matchCondition = {
            etf_date: { $gte: date },
            etf_name: { $regex: `${infoListRequestModel.etfName}`, $options: "ix" }
        }
        
        if (infoListRequestModel.etfCompany && infoListRequestModel.etfCompany[0] !== "") {
            matchCondition.management_company = { $in: infoListRequestModel.etfCompany };
        }

        return await this.etfPriceModel.aggregate([
            {
                $match: matchCondition
            },
            {
                $sort: {
                    etf_date: 1
                }
            },
            {
                $group: {
                    _id: "$etf_code",
                    etfName: {$last: "$etf_name"},
                    latestDate: {$last: "$etf_date"},
                    firstPrice: { $first: "$etf_price"},
                    lastPrice: { $last: "$etf_price"},
                    managementCompany: { $last: "$management_company"}
                }
            },
            {
                $project: {
                    _id: 0,
                    etfCode: "$_id",
                    etfName: "$etfName",
                    latestDate: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$latestDate"
                        }
                    },
                    latestPrice: "$lastPrice",
                    monthlyReturn: {
                        $round: [
                            {
                                $multiply: [
                                    {
                                        $divide: [
                                            { $subtract: ["$lastPrice", "$firstPrice"] },
                                            "$firstPrice"
                                        ]
                                    },
                                    100
                                ]
                            },
                            1
                        ]
                    },
                    managementCompany: "$managementCompany"
                }
            }, 
            {
                $sort: {
                    monthlyReturn: infoListRequestModel.sort
                }
            },{
                $skip: 0 // TODO : 무한 스크롤에 사용할 것.
            },{
                $limit: 20
            }
        ])
    }

    async getPriceList(priceListRequestModel) {
        const date = new Date(getDate(priceListRequestModel.benefitMonth))

        return await this.etfPriceModel.aggregate([
            {
                $match: {
                    etf_code: { $eq: Number(priceListRequestModel.etfCode) },
                    etf_date: { $gte: date }
                }
            },
            {
                $sort: { etf_date: 1 }
            },
            {
                $project: {
                    _id: 0,
                    date: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$etf_date"
                        }
                    },
                    price: "$etf_price"
                }
            }
        ])
    }
}

function getDate(day){
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - day);
    
    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const _day = String(targetDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${_day}`;
}