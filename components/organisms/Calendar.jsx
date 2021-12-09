import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import axios from "axios";
import { useEffect, useState } from "react";

const Calendar = ({}) => {
	const [appointments, setAppointments] = useState([{}]);
	
	useEffect(async () => {
		const req_appointments = await (await axios.post('/api/appointments/appointments')).data;
		setAppointments(req_appointments);
	}, [])

	const businessHours = [
		{
			daysOfWeek: [ 1, 2, 3, 4, 5 ],
			startTime: '08:00',
			endTime: '18:00'
		},
		{
			daysOfWeek: [ 6, 7 ],
			startTime: '10:00',
			endTime: '16:00'
		}
	]

  return (
		<FullCalendar
			businessHours = {businessHours}
			plugins={[timeGridPlugin, interactionPlugin]}
			editable
			selectable
			nowIndicator
			events={appointments}
		/>
  );
};

export default Calendar;