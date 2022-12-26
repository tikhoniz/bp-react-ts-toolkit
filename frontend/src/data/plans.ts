const plans = {
	0: {
		id: "one-group",
		description: "Одна тренировка в группе",
		type: "group",
		icon: "/svg/icon-table-top.svg",
		regularPrice: "15.00",
		discount: "50%",
		discountPrice: "7.5",
		//stripePriceId: "price_1KWrJsDEPLUFmBILFHTJAlgo", // режим production
		stripePriceId: "price_1KUBR2DEPLUFmBILTkBqjFzb", // проверка оплаты Stripe в режиме development
		qty: "1",
		lists: [
			{ text: "Экономия", isAvailable: false },
			{ text: "Длительность 60 минут", isAvailable: true },
			{ text: "Стоимость тренировки $7.5", isAvailable: true },
		],
		labelAction: "Выбрать",
	},
	1: {
		id: "five-group",
		description: "Блок из пяти тренировок в группе",
		type: "group",
		icon: "/svg/icon-hundred.svg",
		regularPrice: "60.00",
		discountPrice: "30.00",
		stripePriceId: "price_1KWrN4DEPLUFmBILNAtzl4iW",
		qty: "5",
		discount: "50%",
		save: "15.00",
		lists: [
			{ text: "Экономия $15", isAvailable: true },
			{ text: "Длительность 60 минут", isAvailable: true },
			{ text: "Стоимость тренировки $6", isAvailable: true },
		],
		labelAction: "Выбрать",
	},
	2: {
		id: "ten-group",
		description: "Блок из десяти тренировок в группе",
		type: "group",
		icon: "/svg/icon-hip-twist.svg",
		regularPrice: "100",
		discountPrice: "50.00",
		stripePriceId: "price_1KWrM7DEPLUFmBIL1pPAiBKY",
		qty: "10",
		discount: "50%",
		save: "50.00",
		lists: [
			{ text: "Экономия $50", isAvailable: true },
			{ text: "Длительность 60 минут", isAvailable: true },
			{ text: "Стоимость тренировки $5", isAvailable: true },
		],
		labelAction: "Выбрать",
	},
};

export default plans;
