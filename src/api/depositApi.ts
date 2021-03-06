import {DepositCreditCardModel} from '../models/index';
import {RestApi} from './index';
import {ApiResponse} from './types/index';

export interface DepositApi {
  fetchBankCardPaymentUrl: (
    deposit: DepositCreditCardModel
  ) => ApiResponse<any>;
  fetchDepositDefaultValues: () => ApiResponse<any>;
  fetchFee: () => ApiResponse<any>;
  fetchSwiftRequisites: (assetId: string) => ApiResponse<any>;
  sendSwiftRequisites: (assetId: string, amount: number) => ApiResponse<any>;
}

export class RestDepositApi extends RestApi implements DepositApi {
  fetchBankCardPaymentUrl = (deposit: DepositCreditCardModel) =>
    this.post('/deposits/fxpaygate', deposit.asJson);

  fetchDepositDefaultValues = () => this.get('/deposits/fxpaygate/last');

  fetchFee = () => this.get('/deposits/fxpaygate/fee');

  fetchSwiftRequisites = (assetId: string) =>
    this.get(`/deposits/swift/${assetId}/requisites`);

  sendSwiftRequisites = (assetId: string, amount: number) =>
    this.postRes(`/deposits/swift/${assetId}/email`, {amount});
}

export default RestDepositApi;
