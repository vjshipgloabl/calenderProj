import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { X } from "lucide-react";
import { AddEvent } from "@/pages/AddEvent";

export const PopOverComponent = ({
  open,
  setOpen,
  event,
  slotDetails,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  event: {
    id: number;
    title: string;
    start: Date;
    end: Date;
    description: string;
  }[];
  slotDetails: any;
}) => {
  console.log("here", slotDetails);
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="gap-2 p-2 bg-blue-100">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between bg-amber-100 border  rounded-lg h-12 p-2 w-full">
            <div className="">
              <h3>Events</h3>
            </div>
            <div className="cursor-pointer" onClick={() => setOpen(false)}>
              <X />
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            {event.length !== 0 ? (
              event.filter((evt) => {
                const eventStart = new Date(evt.start);
                const eventEnd = new Date(evt.end);
                const slotStart = new Date(slotDetails.start);
                const slotEnd = new Date(slotDetails.end);
                return (
                  (eventStart.getTime() >= slotStart.getTime() &&
                    eventStart.getTime() <= slotEnd.getTime()) ||
                  (eventEnd.getTime() >= slotStart.getTime() &&
                    eventEnd.getTime() <= slotEnd.getTime())
                );
              }).length !== 0 ? (
                event
                  .filter((evt) => {
                    const eventStart = new Date(evt.start);
                    const eventEnd = new Date(evt.end);
                    const slotStart = new Date(slotDetails.start);
                    const slotEnd = new Date(slotDetails.end);
                    return (
                      (eventStart.getTime() >= slotStart.getTime() &&
                        eventStart.getTime() <= slotEnd.getTime()) ||
                      (eventEnd.getTime() >= slotStart.getTime() &&
                        eventEnd.getTime() <= slotEnd.getTime())
                    );
                  })
                  .map((evt) => (
                    <Accordion
                      className="bg-slate-500"
                      type="single"
                      collapsible
                      key={evt.id}
                    >
                      <AccordionItem value={`item-${evt.id}`}>
                        <AccordionTrigger className="bg-blue-200 text-center">
                          {evt.title}
                        </AccordionTrigger>
                        <AccordionContent>{evt.description}</AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))
              ) : (
                <Accordion type="single">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="bg-blue-300">
                      No Event Today
                    </AccordionTrigger>
                  </AccordionItem>
                </Accordion>
              )
            ) : (
              ""
            )}
            <AddEvent slotDetails={slotDetails} />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction>Add Event</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
