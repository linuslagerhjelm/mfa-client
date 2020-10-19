import { ReplaySubject } from 'rxjs';

export type CurrencySubscription = ReplaySubject<Record<string, Currency>>

export interface Currency {
  currencyCode: string,
  currencyName: string,
  icon: string,
  exchangeRate?: string,
}

export interface ApiCurrency {
  bid_rate: number,
  exchange_rate: number,
  last_updated_time: string,
  listed_currency: string,
  offer_rate: number,
}

export interface ApiResponse {
  body: {
    fx_spot_exchange_rates: {
      fx_spot_mid_exchange_rates: ApiCurrency[] 
    } [],
  },
};