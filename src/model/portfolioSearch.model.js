export class SearchRequestModel {
    ProfitRatio
    mdd
    dailyLowestProfitRatio
    constructor({ProfitRatio, mdd, dailyLowestProfitRatio}){
        this.ProfitRatio = ProfitRatio
        this.mdd = mdd
        this.dailyLowestProfitRatio = dailyLowestProfitRatio
    }
}

export class PortfolioIdentifierModel {
    createdDate
    username
    constructor({createdDate, username}) {
        this.createdDate = createdDate
        this.username = username
    }
}