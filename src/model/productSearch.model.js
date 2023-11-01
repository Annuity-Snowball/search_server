export class InfoListRequestModel {
    etfName
    etfCompany
    benefitMonth
    sort
    constructor({etfName, etfCompany, benefitMonth, sort}){
        this.etfName = etfName
        this.etfCompany = etfCompany
        this.benefitMonth = benefitMonth
        if (sort == "asc") {
            this.sort = 1
        } else {
            this.sort = -1
        }
    }
}

export class PriceListRequestModel {
    etfCode
    benefitMonth
    constructor({etfCode, benefitMonth}){
        this.etfCode = etfCode
        this.benefitMonth = benefitMonth
    }
}