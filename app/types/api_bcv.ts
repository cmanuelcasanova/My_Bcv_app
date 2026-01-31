export interface Api_Bcv {
  current: Current
  previous: Previous
  changePercentage: ChangePercentage
}

interface Current {
  usd: number
  eur: number
  date: string
}

interface Previous {
  usd: number
  eur: number
  date: string
}

interface ChangePercentage {
  usd: number
  eur: number
}



export interface BinanceP2PResponse {
  code: string;
  message: string;
  data: BinanceAd[];
  success: boolean;
}

export interface BinanceAd {
  adv: {
    price: string;          
    initAmount: string;
    minSingleTransAmount: string;
    maxSingleTransAmount: string;
  };
  advertiser: {
    nickName: string;
    monthOrderCount: number; 
    monthFinishRate: number;
  };
}


export interface Consulta_Binance_Type {

status: number, Compra: Binance_Type[], Venta: Binance_Type[]


}




export interface Binance_Type {
  adv: Adv
  advertiser: Advertiser
  privilegeDesc: any
  privilegeType: any
  privilegeTypeAdTotalCount: any
}

export interface Adv {
  advNo: string
  classify: string
  tradeType: string
  asset: string
  fiatUnit: string
  advStatus: any
  priceType: any
  priceFloatingRatio: any
  rateFloatingRatio: any
  currencyRate: any
  price: string
  initAmount: any
  surplusAmount: string
  tradableQuantity: string
  amountAfterEditing: any
  maxSingleTransAmount: string
  minSingleTransAmount: string
  buyerKycLimit: any
  buyerRegDaysLimit: any
  buyerBtcPositionLimit: any
  remarks: any
  autoReplyMsg: any
  payTimeLimit: number
  tradeMethods: TradeMethod[]
  userTradeCountFilterTime: any
  userBuyTradeCountMin: any
  userBuyTradeCountMax: any
  userSellTradeCountMin: any
  userSellTradeCountMax: any
  userAllTradeCountMin: any
  userAllTradeCountMax: any
  userTradeCompleteRateFilterTime: any
  userTradeCompleteCountMin: any
  userTradeCompleteRateMin: any
  userTradeVolumeFilterTime: any
  userTradeType: any
  userTradeVolumeMin: any
  userTradeVolumeMax: any
  userTradeVolumeAsset: any
  createTime: any
  advUpdateTime: any
  fiatVo: any
  assetVo: any
  advVisibleRet: any
  takerAdditionalKycRequired: number
  minFiatAmountForAdditionalKyc: any
  inventoryType: any
  offlineReason: any
  assetLogo: any
  assetScale: number
  fiatScale: number
  priceScale: number
  fiatSymbol: string
  isTradable: boolean
  dynamicMaxSingleTransAmount: string
  minSingleTransQuantity: string
  maxSingleTransQuantity: string
  dynamicMaxSingleTransQuantity: string
  commissionRate: string
  takerCommissionRate: any
  minTakerFee: any
  tradeMethodCommissionRates: any
  launchCountry: any
  abnormalStatusList: any
  closeReason: any
  storeInformation: any
  allowTradeMerchant: any
  adTradeInstructionTagInfoRets: any
  isSafePayment: boolean
  adAdditionalKycVerifyItems: any
  isStarTraderAdditionalKycExclusion: any
  isStarTraderCounterpartyConditionsExclusion: any
  nonTradableRegions: any
  invisibleType: any
  invisibleTitle: any
  invisibleReason: any
  privilegeType: any
}

export interface TradeMethod {
  payId: any
  payMethodId: string
  payType: string
  payAccount: any
  payBank: any
  paySubBank: any
  identifier: string
  iconUrlColor: any
  tradeMethodName: string
  tradeMethodShortName: string
  tradeMethodBgColor: string
}

export interface Advertiser {
  userNo: string
  realName: any
  nickName: string
  margin: any
  marginUnit: any
  orderCount: any
  monthOrderCount: number
  monthFinishRate: number
  positiveRate: number
  advConfirmTime: any
  email: any
  registrationTime: any
  mobile: any
  userType: string
  tagIconUrls: any[]
  userGrade: number
  userIdentity: string
  proMerchant: any
  badges: string[]
  vipLevel: number
  isBlocked: boolean
  activeTimeInSecond: number
}
