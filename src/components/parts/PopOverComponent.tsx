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
import { CircleX, X } from "lucide-react";
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
      <AlertDialogContent className="p-2 border-none rounded-xl bg-sky-50">
        <AlertDialogHeader className="border-0 rounded-md">
          <AlertDialogTitle className="flex justify-between rounded-md bg-sky-200 h-10 w-full  text-gray-600  ">
            <div className="text-lg py-1 px-3">
              <h3>Events</h3>
            </div>
            <div
              className="cursor-pointer py-2 px-2"
              onClick={() => setOpen(false)}
            >
              <CircleX className="" />
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className="z-100 bg-sky-100 border-none sm:rounded-xl">
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
      </AlertDialogContent>
    </AlertDialog>
  );
};
