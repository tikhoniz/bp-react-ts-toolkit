import { format } from "date-fns";
import { ru } from "date-fns/locale";

export function getCurrentTime() {
	return new Date().getTime();
}

export function getEventTime(event: string) {
	return new Date(event).getTime();
}

export function humanReadableDate(time: any, locale: any) {
	const date = new Date(time);
	return date.toLocaleDateString(locale, {
		day: "2-digit",
		month: "long",
	});
}

export function humanReadableTime(time: any, locale: string) {
	const date = new Date(time);
	return date.toLocaleTimeString(locale, {
		hour: "numeric",
		minute: "numeric",
	});
}

export function humanReadableWeekday(time: any, locale: string) {
	const date = new Date(time);
	return date.toLocaleDateString(locale, {
		weekday: "long",
	});
}

export function dayMonthYearDate(time: any) {
	const date = new Date(time);
	// использует "en-GB" что  бы формат даты был 29/06/21
	// иначе показывает в разных браузерах по разному
	return date.toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "2-digit",
		year: "2-digit",
	});
}

export function fDate(date: any) {
	return format(new Date(date), "dd MMMM yyyy", { locale: ru });
	//return format(new Date(date), "dd MMMM yyyy");
}

export function fDateYear(date: any) {
	return format(new Date(date), "yyyy");
}

export function fDateMonthYear(date: any) {
	return format(new Date(date), "LLLL yyyy", { locale: ru });
}
