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

	const businessHours = [ // specify an array instead
		{
			daysOfWeek: [ 1, 2, 3 ], // Monday, Tuesday, Wednesday
			startTime: '08:00', // 8am
			endTime: '18:00' // 6pm
		},
		{
			daysOfWeek: [ 4, 5 ], // Thursday, Friday
			startTime: '10:00', // 10am
			endTime: '16:00' // 4pm
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