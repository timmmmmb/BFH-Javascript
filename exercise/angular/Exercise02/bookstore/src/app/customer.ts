export class Customer {
	public firstName: string;
	public lastName: string;
	public email: string;
	public creditCard = new CreditCard();
}

export class CreditCard {
	public type: CreditCardType;
	public number: string;
	public expirationYear: number;
	public expirationMonth: number;
}

export enum CreditCardType {
	MASTERCARD = 'MASTERCARD', VISA = 'VISA'
}