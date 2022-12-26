import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
// store
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { createPaidOrder } from "../../store/actionCreators/orderActions";
// material
import { Skeleton, Stack } from "@mui/material";
import { checkAuth } from "../../store/actionCreators/userActions";
// components

const PayPalCheckout = ({ order }: any) => {
	const navigate = useNavigate();
	const appDispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.userReducer);

	const [first, setfirst] = useState(true);

	const { discountPrice, regularPrice, discount } = order as any;

	// This values are the props in the UI
	const amount = discount ? discountPrice : regularPrice;
	const currency = "USD";
	const style: any = { layout: "vertical" };

	// usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
	// This is the main reason to wrap the PayPalButtons in a new component
	const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

	useEffect(() => {
		dispatch({
			type: "resetOptions",
			value: {
				...options,
				currency: currency,
			},
		});
		// eslint-disable-next-line
	}, [currency]);

	return (
		<>
			{isPending && (
				<Stack spacing={2}>
					<Skeleton variant="rounded" height={55} />
					<Skeleton variant="rounded" height={55} />
				</Stack>
			)}
			<PayPalButtons
				style={style}
				disabled={first}
				onInit={() => setfirst(false)}
				// Используется для повторного рендеринга компонента. Изменения в этом реквизите уничтожат существующие кнопки и отобразят их снова, используя текущие реквизиты.
				forceReRender={[amount, currency, style]}
				fundingSource={undefined}
				// createOrder Вызывается по нажатию кнопки для настройки разового платежа.
				createOrder={(data, actions) => {
					return actions.order
						.create({
							purchase_units: [
								{
									description: order.description,
									amount: {
										currency_code: currency,
										value: amount,
									},
								},
							],
						})
						.then((orderId) => {
							// Your code here after create the order
							//console.log("orderId", orderId);

							return orderId;
						});
				}}
				// Вызывается при завершении транзакции. Часто используется для информирования покупателя о завершении сделки.
				onApprove={async (data, actions: any) => {
					const paymentResult: any = await actions.order.capture();

					const newPaidOrder = {
						user_id: user?.id,
						user_email: user?.email,
						user_name:
							paymentResult.payer.name.given_name +
							paymentResult.payer.name.surname,
						description: order.description,
						type: order.type,
						qty: order.qty,
						amount_total: paymentResult?.purchase_units[0].amount.value,
						currency: paymentResult.purchase_units[0].amount.currency_code,
						regular_price: order.regularPrice,
						discount: order.discount,
						discount_price: order.discountPrice,
						payment_method: "PayPal",
						payment_result: paymentResult,
					};

					const response: any = await appDispatch(
						createPaidOrder(newPaidOrder)
					);
					// обновляет пользователя для обновления количества тренировок
					await appDispatch(checkAuth());

					if (!response?.error) navigate("/payment/success");
				}}
				onCancel={() => {}}
				onError={(err) => {
					navigate("/payment/error");
					console.log(err);
				}}
			/>
		</>
	);
};

export default PayPalCheckout;
// * onApprove data
//accelerated: false;
//billingToken: null;
//facilitatorAccessToken: "A21AALtPNjal_8wHcc1GFf-wyxqMqpbMXAn6bn4FGrZr-GgPWCCYp50ZtZ6pGwi6U3WulpKZC9FWPJBj7kh3iyr2w7Qv24qXw";
//orderID: "33P78549AY731882C";
//payerID: "RQV7NL9CPGLDQ";
//paymentID: null;
//paymentSource: "paypal";
// * onApprove actions

// * onApprove details
//create_time: "2022-09-30T12:35:53Z"
//id: "5YY59216045645921"
//intent: "CAPTURE"
//links: Array(1)
//0: {href: 'https://api.sandbox.paypal.com/v2/checkout/orders/5YY59216045645921', rel: 'self', method: 'GET'}
//payer:
//address: {country_code: 'US'}
//email_address: "americanBoy@personal.example.com"
//name:
//given_name: "American"
//surname: "Boy"
//payer_id: "RQV7NL9CPGLDQ"
//purchase_units:
//0:
//amount: {currency_code: 'USD', value: '2.00'}
//payee: {email_address: 'sb-fm5je13571173@business.example.com', merchant_id: '6GDXL2KL4Q3NE'}
//payments: {captures:
//	0:
//	amount: {currency_code: 'USD', value: '2.00'}
//	create_time: "2022-09-30T12:36:07Z"
//	final_capture: true
//	id: "28X20823RE154630X"
//	seller_protection: {status: 'ELIGIBLE', dispute_categories: Array(2)}
//	status: "COMPLETED"
//	update_time: "2022-09-30T12:36:07Z"
//reference_id: "default"
//shipping: {name: {
//	full_name: "American Boy"
//},
//address: {
//	address_line_1: "1 Main St"
//	admin_area_1: "CA"
//	admin_area_2: "San Jose"
//	country_code: "US"
//	postal_code: "95131"
//}
//length: 1
//status: "COMPLETED"
//update_time: "2022-09-30T12:36:07Z"

//* success response
//create_time
//:
//"2022-10-04T11:19:45Z"
//id
//:
//"13F53982LG6250625"
//intent
//:
//"CAPTURE"
//links
//:
//Array(1)
//0
//:
//href
//:
//"https://api.sandbox.paypal.com/v2/checkout/orders/13F53982LG6250625"
//method
//:
//"GET"
//rel
//:
//"self"
//[[Prototype]]
//:
//Object
//length
//:
//1
//[[Prototype]]
//:
//Array(0)
//payer
//:
//address
//:
//country_code
//:
//"PL"
//[[Prototype]]
//:
//Object
//email_address
//:
//"sb-quiel13575308@personal.example.com"
//name
//:
//given_name
//:
//"Stanisław"
//surname
//:
//"Jerzy Lec"
//[[Prototype]]
//:
//Object
//payer_id
//:
//"GQ6NFWC6Y6U4L"
//[[Prototype]]
//:
//Object
//purchase_units
//:
//Array(1)
//0
//:
//amount
//:
//currency_code
//:
//"USD"
//value
//:
//"30.00"
//[[Prototype]]
//:
//Object
//description
//:
//"Блок из пяти тренировок в группе"
//payee
//:
//email_address
//:
//"sb-fm5je13571173@business.example.com"
//merchant_id
//:
//"6GDXL2KL4Q3NE"
//[[Prototype]]
//:
//Object
//payments
//:
//captures
//:
//Array(1)
//0
//:
//amount
//:
//currency_code
//:
//"USD"
//value
//:
//"30.00"
//[[Prototype]]
//:
//Object
//create_time
//:
//"2022-10-04T11:19:54Z"
//final_capture
//:
//true
//id
//:
//"6C853969FX653071S"
//seller_protection
//:
//dispute_categories
//:
//(2) ['ITEM_NOT_RECEIVED', 'UNAUTHORIZED_TRANSACTION']
//status
//:
//"ELIGIBLE"
//[[Prototype]]
//:
//Object
//status
//:
//"COMPLETED"
//update_time
//:
//"2022-10-04T11:19:54Z"
//[[Prototype]]
//:
//Object
//length
//:
//1
//[[Prototype]]
//:
//Array(0)
//[[Prototype]]
//:
//Object
//reference_id
//:
//"default"
//shipping
//:
//address
//:
//address_line_1
//:
//"Lul. Dubois Stanisława 121"
//admin_area_1
//:
//" "
//admin_area_2
//:
//"Łódź"
//country_code
//:
//"PL"
//postal_code
//:
//"93-474"
//[[Prototype]]
//:
//Object
//name
//:
//full_name
//:
//"Stanisław Jerzy Lec"
//[[Prototype]]
//:
//Object
//[[Prototype]]
//:
//Object
//[[Prototype]]
//:
//Object
//length
//:
//1
//[[Prototype]]
//:
//Array(0)
//status
//:
//"COMPLETED"
//update_time
//:
//"2022-10-04T11:19:54Z"
