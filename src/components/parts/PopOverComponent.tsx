import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CircleX } from "lucide-react";
import { AddEvent } from "@/pages/AddEvent";
import { useState } from "react";

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
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [openAddEvent, setOpenAddEvent] = useState<boolean>(false);
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="p-2 border-none rounded-xl bg-sky-50 ">
        <AlertDialogHeader className="border-0 rounded-md">
          <AlertDialogTitle className="flex justify-between rounded-md bg-sky-200 h-10 w-full text-sky-800">
            <div className="text-lg py-1 px-3">
              <h3>Events</h3>
            </div>
            <div
              className="cursor-pointer py-2 px-2"
              onClick={() => {
                setOpen(false);
                setOpenAddEvent(false);
              }}
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
                  .map((evt, index) => (
                    <Accordion
                      className=""
                      type="single"
                      collapsible
                      value={String(activeStep)}
                    >
                      <AccordionItem className="m-2" value={String(index)}>
                        <AccordionTrigger
                          className="bg-sky-200 p-3 font-sans rounded-t-lg"
                          onClick={() =>
                            setActiveStep(index === activeStep ? null : index)
                          }
                        >
                          <p> {evt.title}</p>
                          {/* {String(evt.id)} */}
                        </AccordionTrigger>
                        <AccordionContent className="text-sky-200 text-start bg-sky-800 p-3 rounded-b-lg">
                          {evt.description}
                        </AccordionContent>
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
            {!openAddEvent && (
              <button
                className="w-40 bg-sky-800 ml-80 font-semibold m-2 text-sky-200 h-10 rounded-lg"
                onClick={() => setOpenAddEvent(true)}
              >
                Add Event
              </button>
            )}
            {openAddEvent && (
              <AddEvent slotDetails={slotDetails} setShowPopover={setOpen} />
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};
