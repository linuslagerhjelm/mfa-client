import axios, { AxiosResponse} from "axios";
import { ReplaySubject } from 'rxjs';
import { currencies } from "../const/currencies";
import { ApiResponse, ApiCurrency, Currency, CurrencySubscription, ConvertSubscription, ConvertRequest } from "../const/types";

const baseUrl = "https://linuslagerhjelm-opkoko-prep.builtwithdark.com";
const ratesUrl = `${baseUrl}/rates`;
const convertUrl = `${baseUrl}/convert`;

const decorateCurrencies = (rates: ApiCurrency[]): Record<string, Currency> => {
  const localCurrencies: Record<string, Currency> = {...currencies};
  rates.forEach(rate => {
    localCurrencies[rate.listed_currency].exchangeRate = rate.exchange_rate?.toFixed(4)?.toString();
  });

  return localCurrencies;
}

const unwrap = (res: AxiosResponse<ApiResponse>): ApiCurrency[] => {
  return res.data?.body?.fx_spot_exchange_rates[0].fx_spot_mid_exchange_rates || []
};

const observable: CurrencySubscription = 
  new ReplaySubject<Record<string, Currency>>();

export const getCurrenciesSubscription = (): CurrencySubscription => observable;
axios.get(ratesUrl).then(
  (res: AxiosResponse<ApiResponse>) => (
    observable.next(decorateCurrencies(unwrap(res)))
  )
);

export const convert = (req: ConvertRequest): ConvertSubscription => {
  return new Promise((resolve, reject) => {
    axios.post(convertUrl, { ...req }).then(res => {
      resolve(res.data)})
  });
}

