import { useCallback, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useEventStore } from "@/zustand/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "../custom.css";
import { PopOverComponent } from "@/components/parts/PopOverComponent";

export const CalenderView = () => {
  const [events, setEvents] = useState<
    { id: number; title: string; start: Date; end: Date; description: string }[]
  >([]);

  const [showPopover, setShowPopover] = useState(false);
  const [slotDetails, setSlotDetails] = useState<[]>([]);
  const localizer = momentLocalizer(moment);

  const storedEvents = useEventStore((state: any) => state.events);

  useEffect(() => {
    setEvents(storedEvents);
  }, [storedEvents]);

  const onSelectSlot = useCallback((slotInfo: any) => {
    setSlotDetails(slotInfo);
    setShowPopover(true);
  }, []);
  return (
    <Card className="sm:w-2/3 h-auto rounded-3xl bg-sky-200 text-sky-800">
      <CardHeader>
        <CardTitle>Event Calender</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "500px", borderStyle: "double" }} // Corrected style
          events={events}
          onSelectSlot={onSelectSlot}
          onSelectEvent={(event) => console.log("Event selected:", event)}
          selectable
          className=""
        />
        <PopOverComponent
          open={showPopover}
          setOpen={setShowPopover}
          event={events}
          slotDetails={slotDetails}
        />
      </CardContent>
    </Card>
  );
};
