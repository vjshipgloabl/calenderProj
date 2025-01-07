import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

export const AddEvent = ({ slotDetails }) => {
  const date = new Date(slotDetails.start);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const d = new Date(
    year,
    month,
    day,
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  );

  const startDate = new Date(slotDetails.start); // Assuming slotDetails.start is a valid date string
  const endDate = new Date(slotDetails.end || slotDetails.start);

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: startDate,
      endDate: endDate,
      isImportant: "",
      isPersonal: 0,
    },
  });
  console.log(startDate, form.watch("startDate"));

  const onSubmit = async (data: any) => {
    alert("Sdfsdfdf");
    console.log(data);
  };

  function handleStartDateSelect(date: Date | undefined) {
    if (date) {
      form.setValue("startDate", date);
    }
  }
  function handleEndDateSelect(date: Date | undefined) {
    if (date) {
      form.setValue("endDate", date);
    }
  }

  function handleTimeChange(
    type: "hour" | "minute" | "ampm",
    value: string,
    target: "start" | "end"
  ) {
    const currentStartDate = form.getValues("startDate");
    const currentEndDate = form.getValues("endDate");
    let newStartDate = new Date(currentStartDate);
    let newEndDate = new Date(currentEndDate);
    const targetDate = target === "start" ? newStartDate : newEndDate;
    if (type === "hour") {
      const hour = parseInt(value, 10);
      targetDate.setHours(targetDate.getHours() >= 12 ? hour + 12 : hour);
    } else if (type === "minute") {
      targetDate.setMinutes(parseInt(value, 10));
    } else if (type === "ampm") {
      const hours = targetDate.getHours();
      if (value === "AM" && hours >= 12) {
        targetDate.setHours(hours - 12);
      } else if (value === "PM" && hours < 12) {
        targetDate.setHours(hours + 12);
      }
    }
    if (target === "start") {
      form.setValue("startDate", newStartDate);
    } else {
      form.setValue("endDate", newEndDate);
    }
  }
  return (
    <div className="w-full p-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between">
                  Title <FormMessage className="text-red-600" />
                </FormLabel>
                <FormControl>
                  <Input placeholder="Title" type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex justify-between w-full space-x-3">
            {/* start Date */}
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Enter your start date & time (12h)</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "MM/dd/yyyy hh:mm aa")
                          ) : (
                            <span>MM/DD/YYYY hh:mm aa</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <div className="sm:flex">
                        <Calendar
                          mode="single"
                          selected={field.value ? field.value : startDate}
                          onSelect={handleStartDateSelect}
                          initialFocus
                          className="bg-white"
                        />
                        <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                          <ScrollArea className="w-64 sm:w-auto bg-white">
                            <div className="flex sm:flex-col p-2">
                              {Array.from({ length: 12 }, (_, i) => i + 1)
                                .reverse()
                                .map((hour) => (
                                  <Button
                                    key={hour}
                                    size="icon"
                                    variant={
                                      field.value &&
                                      field.value.getHours() % 12 === hour % 12
                                        ? "default"
                                        : "ghost"
                                    }
                                    className="sm:w-full shrink-0 aspect-square"
                                    onClick={() =>
                                      handleTimeChange(
                                        "hour",
                                        hour.toString(),
                                        "start"
                                      )
                                    }
                                  >
                                    {hour}
                                  </Button>
                                ))}
                            </div>
                            <ScrollBar
                              orientation="horizontal"
                              className="sm:hidden"
                            />
                          </ScrollArea>
                          <ScrollArea className="w-64 sm:w-auto bg-white">
                            <div className="flex sm:flex-col p-2">
                              {Array.from({ length: 12 }, (_, i) => i * 5).map(
                                (minute) => (
                                  <Button
                                    key={minute}
                                    size="icon"
                                    variant={
                                      field.value &&
                                      field.value.getMinutes() === minute
                                        ? "default"
                                        : "ghost"
                                    }
                                    className="sm:w-full shrink-0 aspect-square"
                                    onClick={() =>
                                      handleTimeChange(
                                        "minute",
                                        minute.toString(),
                                        "start"
                                      )
                                    }
                                  >
                                    {minute.toString().padStart(2, "0")}
                                  </Button>
                                )
                              )}
                            </div>
                            <ScrollBar
                              orientation="horizontal"
                              className="sm:hidden"
                            />
                          </ScrollArea>
                          <ScrollArea className="bg-white">
                            <div className="flex sm:flex-col p-2">
                              {["AM", "PM"].map((ampm) => (
                                <Button
                                  key={ampm}
                                  size="icon"
                                  variant={
                                    field.value &&
                                    ((ampm === "AM" &&
                                      field.value.getHours() < 12) ||
                                      (ampm === "PM" &&
                                        field.value.getHours() >= 12))
                                      ? "default"
                                      : "ghost"
                                  }
                                  className="sm:w-full shrink-0 aspect-square"
                                  onClick={() => handleTimeChange("ampm", ampm)}
                                >
                                  {ampm}
                                </Button>
                              ))}
                            </div>
                          </ScrollArea>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* End Date */}
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Enter your end date & time (12h)</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "MM/dd/yyyy hh:mm aa")
                          ) : (
                            <span>MM/DD/YYYY hh:mm aa</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <div className="sm:flex">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={handleEndDateSelect}
                          initialFocus
                          className="bg-white"
                        />
                        <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                          <ScrollArea className="w-64 sm:w-auto bg-white">
                            <div className="flex sm:flex-col p-2">
                              {Array.from({ length: 12 }, (_, i) => i + 1)
                                .reverse()
                                .map((hour) => (
                                  <Button
                                    key={hour}
                                    size="icon"
                                    variant={
                                      field.value &&
                                      field.value.getHours() % 12 === hour % 12
                                        ? "default"
                                        : "ghost"
                                    }
                                    className="sm:w-full shrink-0 aspect-square"
                                    onClick={() =>
                                      handleTimeChange(
                                        "hour",
                                        hour.toString(),
                                        "end"
                                      )
                                    }
                                  >
                                    {hour}
                                  </Button>
                                ))}
                            </div>
                            <ScrollBar
                              orientation="horizontal"
                              className="sm:hidden"
                            />
                          </ScrollArea>
                          <ScrollArea className="w-64 sm:w-auto bg-white">
                            <div className="flex sm:flex-col p-2">
                              {Array.from({ length: 12 }, (_, i) => i * 5).map(
                                (minute) => (
                                  <Button
                                    key={minute}
                                    size="icon"
                                    variant={
                                      field.value &&
                                      field.value.getMinutes() === minute
                                        ? "default"
                                        : "ghost"
                                    }
                                    className="sm:w-full shrink-0 aspect-square"
                                    onClick={() =>
                                      handleTimeChange(
                                        "minute",
                                        minute.toString(),
                                        "end"
                                      )
                                    }
                                  >
                                    {minute.toString().padStart(2, "0")}
                                  </Button>
                                )
                              )}
                            </div>
                            <ScrollBar
                              orientation="horizontal"
                              className="sm:hidden"
                            />
                          </ScrollArea>
                          <ScrollArea className="bg-white">
                            <div className="flex sm:flex-col p-2">
                              {["AM", "PM"].map((ampm) => (
                                <Button
                                  key={ampm}
                                  size="icon"
                                  variant={
                                    field.value &&
                                    ((ampm === "AM" &&
                                      field.value.getHours() < 12) ||
                                      (ampm === "PM" &&
                                        field.value.getHours() >= 12))
                                      ? "default"
                                      : "ghost"
                                  }
                                  className="sm:w-full shrink-0 aspect-square"
                                  onClick={() =>
                                    handleTimeChange("ampm", ampm, "end")
                                  }
                                >
                                  {ampm}
                                </Button>
                              ))}
                            </div>
                          </ScrollArea>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="flex">
                  <FormLabel className="w-1/4 pt-3 text-start px-2">
                    Description
                  </FormLabel>
                  <FormControl className="w-3/4">
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isImportant"
            render={({ field }) => (
              <FormItem className="flex space-y-0">
                <FormLabel className="w-1/4 pt-3 text-start px-2">
                  Select Priority
                </FormLabel>
                <FormControl className="w-3/4">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      className={`${
                        field.value === "Low"
                          ? "bg-green-200"
                          : field.value === "Medium"
                          ? "bg-amber-300"
                          : field.value === "High"
                          ? "bg-red-300"
                          : ""
                      } w-2/4 `}
                    >
                      <Button
                        variant="outline"
                        className={`gap-0 py-0 border-2 flex justify-between `}
                      >
                        {field.value ? field.value : "Select Priority"}
                        <ChevronDown />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      <DropdownMenuLabel>Importance Level</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => field.onChange("Low")}
                        className={`bg-green-300 ${
                          field.value === "Low" ? "bg-muted" : ""
                        }`}
                      >
                        Low
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => field.onChange("Medium")}
                        className={`bg-amber-300 ${
                          field.value === "Medium" ? "bg-muted" : ""
                        }`}
                      >
                        Medium
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => field.onChange("High")}
                        className={`bg-red-300 ${
                          field.value === "High" ? "bg-muted" : ""
                        }`}
                      >
                        High
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isPersonal"
            render={({ field }) => (
              <FormItem className="flex space-y-0 p-1">
                <FormLabel className="w-1/4 pt-3 text-start px-2">
                  Personal
                </FormLabel>
                <FormControl className="w-3/4 pt-3 ">
                  <div className="flex space-x-1">
                    <Checkbox />
                    <span className="text-sm text-nowrap text-red-600">
                      (Select Only if this Event is Personal)
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

const eventFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Must be 3 or more character(s)" })
    .max(20),
  description: z
    .string()
    .min(10, { message: "Must be 3 or more character(s)" })
    .max(50)
    .optional(),
  startDate: z.date(),
  endDate: z.date(),
  isImportant: z.string(),
  isPersonal: z.number(),
});
