import { useEffect, useRef, useState } from "react";
// full calendar
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import ruLocale from "@fullcalendar/core/locales/ru";
// material
import { Card, useMediaQuery, useTheme } from "@mui/material";
// store
import { eventSliceActions } from "../../../store/reducers/EventSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
// utils
import { getCurrentTime, getEventTime } from "../../../utils/time";
// components
import CalendarToolbar from "./CalendarToolbar";
import CalendarStyle from "./CalendarStyle";
import DialogAnimate from "../../shared/DialogAnimate";
import CalendarEvent from "../../shared/CalendarEvent";

// animate
import { motion } from "framer-motion";

const Calendar = (): JSX.Element => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const calendarRef = useRef(null);
	const [timeFirst, setTimeFirst]: any = useState(null);
	const [viewTitle, setViewTitle] = useState("");
	const [view, setView]: any = useState(isMobile ? "listWeek" : "timeGridWeek");

	// redux
	const dispatch = useAppDispatch();
	const { setEvent } = eventSliceActions;
	const { event, events } = useAppSelector((state) => state.eventReducer);

	const nowDate = new Date().toISOString();

	const currentClasses = events.filter(
		(item) => getEventTime(item.start) > getCurrentTime() - 9 * 60 * 1000
	);

	useEffect(() => {
		setTimeFirst(getEventTime(currentClasses[0]?.start));

		if (timeFirst) {
			const currentTime = getCurrentTime();
			const timeTimer = timeFirst - currentTime + 10 * 60 * 1000;

			const timer = setTimeout(() => {
				setTimeFirst(null);
			}, timeTimer);

			return () => {
				clearTimeout(timer);
			};
		}
	}, [timeFirst, currentClasses]);

	useEffect(() => {
		const calendarEl: any = calendarRef.current;
		if (calendarEl) {
			const calendarApi = calendarEl.getApi();
			const newView = isMobile ? "listWeek" : "dayGridMonth";
			calendarApi.changeView(newView);
			setViewTitle(calendarApi.currentDataManager.data.viewTitle);
			setView(newView);
		}
	}, [isMobile]);

	const handleClickDatePrev = () => {
		const calendarEl: any = calendarRef.current;
		if (calendarEl) {
			const calendarApi = calendarEl.getApi();
			calendarApi.prev();
			setViewTitle(calendarApi.currentDataManager.data.viewTitle);
		}
	};

	const handleClickDateNext = () => {
		const calendarEl: any = calendarRef.current;
		if (calendarEl) {
			const calendarApi = calendarEl.getApi();
			calendarApi.next();
			setViewTitle(calendarApi.currentDataManager.data.viewTitle);
		}
	};

	const handleClickToday = () => {
		const calendarEl: any = calendarRef.current;
		if (calendarEl) {
			const calendarApi = calendarEl.getApi();
			calendarApi.today();
			setViewTitle(calendarApi.currentDataManager.data.viewTitle);
		}
	};

	const handleChangeView = (newView: string) => {
		const calendarEl: any = calendarRef.current;
		if (calendarEl) {
			const calendarApi = calendarEl.getApi();
			calendarApi.changeView(newView);
			setViewTitle(calendarApi.currentDataManager.data.viewTitle);
			setView(newView);
		}
	};

	const handleCloseModal = () => {
		dispatch(setEvent(null));
	};

	const handleSelectEvent = (arg: any) => {
		const selected = events.find((_event) => _event.id === arg.event.id);

		if (selected) dispatch(setEvent(selected.id));
	};

	return (
		<Card
			component={motion.div}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.55 }}
		>
			<CalendarStyle>
				<CalendarToolbar
					title={viewTitle}
					view={view}
					onNextDate={handleClickDateNext}
					onPrevDate={handleClickDatePrev}
					onToday={handleClickToday}
					onChangeView={handleChangeView}
				/>
				<FullCalendar
					selectable
					headerToolbar={false}
					ref={calendarRef}
					initialView={view}
					initialDate={nowDate}
					events={currentClasses as any}
					eventDisplay="block"
					eventClick={handleSelectEvent}
					rerenderDelay={10}
					dayMaxEventRows={4}
					dayMaxEvents={true}
					eventTimeFormat={{
						hour: "numeric",
						minute: "2-digit",
						meridiem: "short",
					}}
					locale={ruLocale} // русская локализация
					firstDay={1} // с понедельника
					allDayMaintainDuration
					eventResizableFromStart
					height={isMobile ? "auto" : 720}
					plugins={[dayGridPlugin, listPlugin, timeGridPlugin]}
					validRange={{
						start: nowDate,
					}}
				/>

				<DialogAnimate open={!!event} onClose={handleCloseModal}>
					{event && <CalendarEvent event={event} />}
				</DialogAnimate>
			</CalendarStyle>
		</Card>
	);
};

export default Calendar;
