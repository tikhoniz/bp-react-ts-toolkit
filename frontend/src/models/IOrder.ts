export interface IOrder {
	_id: string;
	qty: string;
	createdAt: Date;
	discount: string;
	userEmail: string;
	orderType: string;
	description: string;
	regularPrice: string;
	discountPrice: string;
	paymentMethod: string;
}
