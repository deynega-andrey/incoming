export interface IItemData {
  isActive: boolean;
  checked: boolean;
  caseNumber: string;
  resolutionSeriesAndNumber: string;
  fullName: string;
  individualTaxpayerNumber: number;
  paymentSum: number;
  paymentOrDeductionStartDate: string;
  paymentEndDate: string;
  yearOfOverpayment: number;
  regionalBankCode: number;
  targetArticleCategoryCode: number;
  paymentTypeCode: number;
  electronicDocumentTypeCode: number;
  paymentFrequency: string;
  paymentDirectionCode: number;
}

type ContentTypes = string | JSX.Element;
export interface IHeaderCell {
  id: string;
  content: ContentTypes;
}
