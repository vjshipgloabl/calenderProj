import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { useEventStore } from "./zustand/store";
import { PopOverComponent } from "./components/parts/PopOverComponent";

const localizer = momentLocalizer(moment);

function App() {
  const dispatch = useEventStore((state: any) => state.dispatch);
  const [events, setEvents] = useState<
    { id: number; title: string; start: Date; end: Date; description: string }[]
  >([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    description: "",
    location: "",
    isAllDay: false,
    isDone: false,
    isImportant: false,
    isPersonal: false,
    isWork: false,
  });
  const [showPopover, setShowPopover] = useState(false);
  const [slotDetails, setSlotDetails] = useState<[]>([]);

  // Handle adding a new event
  const handleAddEvent = (newEvent: any) => {
    console.log("Adding event:", newEvent);
    setEvents([
      ...events,
      { ...newEvent, id: Date.now(), description: newEvent.description || "" },
    ]);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  // Submit the form to add an event
  const handleSubmit = () => {
    const { title, start, end } = newEvent;
    if (title && start && end) {
      const eventWithDefaults = {
        ...newEvent,
        id: Date.now().toString(), // Adding unique ID
        date: new Date(start), // Ensure it's a Date
      };
      handleAddEvent(eventWithDefaults);
      dispatch({ type: "ADD_EVENT", payload: eventWithDefaults });
    }
  };

  const storedEvents = useEventStore((state: any) => state.events);

  useEffect(() => {
    setEvents(storedEvents);
  }, [storedEvents]);

  console.log("Stored events:", storedEvents);

  const onSelectSlot = useCallback((slotInfo: any) => {
    setSlotDetails(slotInfo);
    setShowPopover(true);
  }, []);
  return (
    <div className="bg-gray-200 w-full h-screen m-0 p-0">
      <h1>Calendar Project</h1>
      <div
        style={{ height: "600px" }}
        className="w-3/6 ml-32 mt-12 bg-white border-2 rounded-md"
      >
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          events={events}
          onSelectSlot={onSelectSlot}
          onSelectEvent={(event) => console.log("Event selected:", event)}
          selectable
        />
      </div>
      <PopOverComponent
        open={showPopover}
        setOpen={setShowPopover}
        event={events}
        slotDetails={slotDetails}
      />
    </div>
  );
}

export default App;

const WeekData = () => {
  return (
    <div className="w-1/2 bg-slate-950">
      <h1>Week Data</h1>
    </div>
  );
};

// const AddEvents = ({
//   newEvent,
//   handleInputChange,
//   handleSubmit,
// }: {
//   newEvent: {
//     title: string;
//     start: string;
//     end: string;
//     description: string;
//     location: string;
//     isAllDay: boolean;
//     isDone: boolean;
//     isImportant: boolean;
//     isPersonal: boolean;
//     isWork: boolean;
//   };
//   handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   handleSubmit: () => void;
// }) => {
//   return (
//     <div className="w-full border-2 p-2 rounded-md mx-2">
//       <div className="w-1/2 mx-32 bg-slate-500">Add Event</div>
//       {/* <div className="p-2 my-3 space-y-4 w-full bg-slate-500">
//         <label htmlFor="title">Title</label>
//         <Input
//           type="text"
//           name="title"
//           placeholder="Event Title"
//           value={newEvent.title}
//           onChange={handleInputChange}
//           className="w-1/2"
//         />
//         <label htmlFor="title">Start date</label>
//         <Input
//           type="datetime-local"
//           name="start"
//           value={newEvent.start}
//           onChange={handleInputChange}
//         />
//         <label htmlFor="title">End date</label>

//         <Input
//           type="datetime-local"
//           name="end"
//           value={newEvent.end}
//           onChange={handleInputChange}
//         />
//       </div>
//       <button
//         className="px-4 py-2 bg-blue-500 text-white rounded"
//         onClick={handleSubmit}
//       >
//         Add Event
//       </button> */}
//       <AddEvent />
//     </div>
//   );
// };
