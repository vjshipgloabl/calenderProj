import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCallback, useEffect, useState } from "react";
import { useEventStore } from "./zustand/store";
import { PopOverComponent } from "./components/parts/PopOverComponent";

const localizer = momentLocalizer(moment);

function App() {
  const [events, setEvents] = useState<
    { id: number; title: string; start: Date; end: Date; description: string }[]
  >([]);

  const [showPopover, setShowPopover] = useState(false);
  const [slotDetails, setSlotDetails] = useState<[]>([]);

  const storedEvents = useEventStore((state: any) => state.events);

  useEffect(() => {
    setEvents(storedEvents);
  }, [storedEvents]);

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
