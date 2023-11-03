import EtfPriceRepository from '../schema/etfPrice.schema.js'
import EtfInformationRepository from '../schema/etfInformation.schema.js';

export default class ProductService {
    etfPriceRepository;
    etfInformationRepository;
    constructor(){
        this.etfPriceRepository = new EtfPriceRepository()
        this.etfInformationRepository = new EtfInformationRepository()
    }

    async searchInfoList(infoListRequestModel) {
        const infoList = await this.etfPriceRepository.getInfoList(infoListRequestModel)
        return infoList
    }

    async getPriceList(priceListRequestModel) {
        const priceList = await this.etfPriceRepository.getPriceList(priceListRequestModel)
        return priceList
    }

    async getComment(etfCode) {
        const commentInfo = await this.etfInformationRepository.getEtfCommentInfo(etfCode)
        try {
            const comment = {
                comment: `${commentInfo[0].etfName}은(는) ${commentInfo[0].etfCompany}이(가) 운용합니다. \n${commentInfo[0].baseIndex}을(를) ${commentInfo[0].category}방식으로 추종합니다.`
            }    

            return comment
        } catch (error) {
            const comment = {
                comment: "이 ETF는 가치평가지표를 제공하지 않습니다."
            }
            return comment
        }        
    }
}