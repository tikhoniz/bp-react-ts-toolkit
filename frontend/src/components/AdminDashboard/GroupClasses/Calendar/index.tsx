import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
// components
import CalendarStyle from "./CalendarStyle";
import { FC, useEffect, useRef, useState } from "react";
import { useTheme, DialogTitle, useMediaQuery } from "@mui/material";
import DialogAnimate from "../../../shared/DialogAnimate";
import CalendarForm from "./CalendarForm";
import { IEvent } from "../../../../models/IEvent";
import { updateEvent } from "../../../../store/actionCreators/eventActions";
import { useAppDispatch } from "../../../../hooks/redux";

interface CalendarProps {
	events: IEvent[];
}

const Calendar: FC<CalendarProps> = ({ events }): JSX.Element => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const dispatch = useAppDispatch();

	const calendarRef = useRef(null);
	const updatableClass = useRef<object | null>(null);
	const selectedRange = useRef<object | null>(null);

	const [isOpenModal, setOpenModal] = useState(false);

	const [date, setDate] = useState(new Date());
	const [view, setView]: any = useState(isMobile ? "listWeek" : "timeGridWeek");

	useEffect(() => {
		const calendarEl: any = calendarRef.current;
		if (calendarEl) {
			const calendarApi = calendarEl.getApi();
			const newView = isMobile ? "listWeek" : "timeGridWeek";
			calendarApi.changeView(newView);
			setView(newView);
		}
	}, [isMobile]);

	const handleClickDatePrev = () => {
		const calendarEl: any = calendarRef.current;
		if (calendarEl) {
			const calendarApi = calendarEl.getApi();
			calendarApi.prev();
			setDate(calendarApi.getDate());
		}
	};

	const handleClickDateNext = () => {
		const calendarEl: any = calendarRef.current;
		if (calendarEl) {
			const calendarApi = calendarEl.getApi();
			calendarApi.next();
			setDate(calendarApi.getDate());
		}
	};

	const handleClickToday = () => {
		const calendarEl: any = calendarRef.current;
		if (calendarEl) {
			const calendarApi = calendarEl.getApi();
			calendarApi.today();
			setDate(calendarApi.getDate());
		}
	};

	const handleChangeView = (newView: string) => {
		const calendarEl: any = calendarRef.current;
		if (calendarEl) {
			const calendarApi = calendarEl.getApi();
			calendarApi.changeView(newView);
			setView(newView);
		}
	};

	const handleSelectRange = (arg: any) => {
		const calendarEl: any = calendarRef.current;
		if (calendarEl) {
			const calendarApi = calendarEl.getApi();
			calendarApi.unselect();
		}

		selectedRange.current = arg;
		setOpenModal(true);
	};

	const handleSelectEvent = (arg: any) => {
		const selectedId = arg.event.extendedProps._id;

		updatableClass.current =
			events.find((_event) => _event._id === selectedId) || null;

		setOpenModal(true);
	};

	const handleDropEvent = ({ event }: any) => {
		const eventId = event.extendedProps._id;
		const eventData = {
			allDay: event.allDay,
			start: event.start,
			end: event.end,
		};

		dispatch(updateEvent({ eventId, eventData }));
	};

	const handleResizeEvent = ({ event }: any) => {
		const eventId = event.extendedProps._id;

		const eventData = {
			allDay: event.allDay,
			start: event.start,
			end: event.end,
		};

		dispatch(updateEvent({ eventId, eventData }));
	};

	const handleCloseModal = () => {
		updatableClass.current = null;
		setOpenModal(false);
	};

	return (
		<CalendarStyle>
			<FullCalendar
				weekends
				editable
				droppable
				selectable
				ref={calendarRef}
				locale="ru"
				initialView={view}
				initialDate={date}
				events={events as any}
				eventDisplay="block"
				eventClick={handleSelectEvent}
				select={handleSelectRange}
				eventDrop={handleDropEvent}
				eventResize={handleResizeEvent}
				allDayMaintainDuration
				eventResizableFromStart
				rerenderDelay={10}
				firstDay={1} // с понедельника
				plugins={[dayGridPlugin, listPlugin, timeGridPlugin, interactionPlugin]}
			/>

			<DialogAnimate open={isOpenModal} onClose={handleCloseModal}>
				<DialogTitle>
					{updatableClass.current
						? "Редактировать событие"
						: "Создать новое событие"}
				</DialogTitle>

				<CalendarForm
					event={updatableClass.current}
					range={selectedRange.current}
					onCancel={handleCloseModal}
				/>
			</DialogAnimate>
		</CalendarStyle>
	);
};

export default Calendar;
