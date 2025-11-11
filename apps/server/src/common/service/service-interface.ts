export interface InterfaceConvertCurrencyService {
	convert(amount: number, from: string, to: string): Promise<number>;
}
