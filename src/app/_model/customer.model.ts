export interface Customer {
  id?: number;
  companyName: string;
  companyNameLocal: string;
  companyNameAmharic: string;
  enterpriseType: string;
  tradeName: string;
  tradeNameLocal: string;
  tradeNameAmharic: string;
  startDate: Date;
  preferredLanguage: string;
}

export interface CustomerDisplay {
  id?: number;
  companyName: string;
  companyNameLocal: string;
  companyNameAmharic: string;
  enterpriseType: string;
  tradeName: string;
  tradeNameLocal: string;
  tradeNameAmharic: string;
  startDate: string;
  startDateDisplay: string;
  preferredLanguage: string;
}
