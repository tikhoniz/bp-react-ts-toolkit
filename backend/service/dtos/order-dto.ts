// dto - data transfer object
export default class OrderDto {
	id: any;
	qty: any;
	type: any;
	discount: any;
	createdAt: any;
	description: any;
	regular_price: any;
	discount_price: any;
	payment_method: any;

	constructor(model: {
		_id: any;
		qty: any;
		type: any;
		discount: any;
		createdAt: any;
		description: any;
		regular_price: any;
		discount_price: any;
		payment_method: any;
	}) {
		this.id = model._id;
		this.qty = model.qty;
		this.type = model.type;
		this.discount = model.discount;
		this.createdAt = model.createdAt;
		this.description = model.description;
		this.regular_price = model.regular_price;
		this.discount_price = model.discount_price;
		this.payment_method = model.payment_method;
	}
}
