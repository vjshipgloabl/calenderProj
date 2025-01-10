import { useState } from "react";
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
import {
  CalendarIcon,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronsUpDown,
  CircleX,
  Eye,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { userList } from "@/extra/userList";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";

export const AddEvent = ({ slotDetails }: { slotDetails: any }) => {
  const startDate = new Date(slotDetails.start);
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
      users: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof eventFormSchema>) => {
    console.log("payload", data);
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

  const [open, setOpen] = useState(false);

  const handleRemoveUser = (id: string) => {
    const selectedUser = form.watch("users") || [];
    const updatedValue = selectedUser.filter((user) => user.id !== id);
    form.setValue("users", updatedValue);
  };

  return (
    <div className="w-full p-2 text-gray-600 z-150">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between ">
                  Title <FormMessage className="text-red-600" />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title"
                    className=""
                    type="text"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="w-full z-150">
            <FormField
              control={form.control}
              name="users"
              render={({ field }) => (
                <FormItem>
                  <div className="flex">
                    <FormLabel className="w-2/4 pt-3 text-start px-1">
                      Add Guests
                    </FormLabel>
                    <FormControl className="w-3/4">
                      <Popover open={open} onOpenChange={setOpen}>
                        <div className="flex flex-col w-full">
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="w-full justify-between"
                            >
                              Search & Select User
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <span className="text-xs pl-2 text-end">
                            (Select Max 5 guest)
                          </span>
                        </div>
                        <PopoverContent className="w-full p-0 bg-slate-100 rounded-lg max-h-72 overflow-y-auto">
                          <Command className="overflow-hidden">
                            <CommandInput placeholder="Search User" />
                            <CommandList className="max-h-60 overflow-y-auto">
                              <CommandEmpty>No User Available</CommandEmpty>
                              <CommandGroup>
                                {userList.map((user) => (
                                  <CommandItem
                                    key={user.id}
                                    value={user.email}
                                    onSelect={() => {
                                      const currentUsers = field.value || []; // Fallback to empty array
                                      if (currentUsers.length > 4) {
                                        console.log(
                                          "herer",
                                          currentUsers.length
                                        );
                                      }
                                      const isUserSelected = currentUsers.some(
                                        (u) => u.email === user.email
                                      );
                                      const updatedValue = isUserSelected
                                        ? currentUsers.filter(
                                            (u) => u.email !== user.email
                                          )
                                        : [...currentUsers, user];
                                      field.onChange(updatedValue);
                                    }}
                                    className="gap-0 text-wrap text-xs rounded-lg bg-gray-200 mt-1 w-full border-2"
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        (field.value || []).some(
                                          (u) => u.name === user.name
                                        )
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    <div>
                                      <p>{user.name}</p>
                                      <p>{user.email}</p>
                                    </div>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </div>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <div className="flex flex-col pt-2 justify-end">
              {form.watch("users")?.map((user) => (
                <Badge
                  key={user.id}
                  className="bg-gray-200 text-gray-500 text-xs font-sans mb-2 px-4 flex justify-between"
                  variant="outline"
                >
                  <div>{user.email}</div>
                  <div className="flex">
                    <Eye className="mr-2" />
                    <CircleX onClick={() => handleRemoveUser(user.id)} />
                  </div>
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex justify-between w-full space-x-3 ">
            {/* start Date */}
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel className="text-start">
                    Start date & time (12h)
                  </FormLabel>
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
                      <div className="sm:flex z-150">
                        <Calendar
                          mode="single"
                          selected={field.value ? field.value : startDate}
                          onSelect={handleStartDateSelect}
                          initialFocus
                          className="bg-white"
                        />
                        <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x ">
                          <ScrollArea className="w-64 sm:w-auto bg-white ">
                            <div className="flex sm:flex-col p-3 gap-0">
                              <p>Hrs</p>
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
                                    className="sm:w-full shrink-0 aspect-square h-6 w-6 gap-5 p-0"
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
                          </ScrollArea>
                          <ScrollArea className="w-64 sm:w-auto bg-white">
                            <div className="flex sm:flex-col p-3 gap-0">
                              <p>Min</p>
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
                                    className="sm:w-full shrink-0 aspect-square h-6 w-6 gap-5 p-0"
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
                                    handleTimeChange("ampm", ampm, "start")
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

            {/* End Date */}
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel className="text-start">
                    End date & time (12h)
                  </FormLabel>
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
                            <div className="flex sm:flex-col p-3 gap-0">
                              <p>Hrs</p>
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
                                    className="sm:w-full shrink-0 aspect-square h-6 w-6 gap-5 p-0"
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
                          </ScrollArea>
                          <ScrollArea className="w-64 sm:w-auto bg-white">
                            <div className="flex sm:flex-col p-3 gap-0">
                              <p>Min</p>
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
                                    className="sm:w-full shrink-0 aspect-square  h-6 w-6 gap-2 p-0"
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
                  <FormLabel className="w-1/4 pt-3 text-start px-1">
                    Description
                  </FormLabel>
                  <FormControl className="w-3/4">
                    <Textarea placeholder="Add Event Details... " {...field} />
                  </FormControl>
                </div>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isImportant"
            render={({ field }) => (
              <FormItem className="flex space-y-0 text-gray-600">
                <FormLabel className="w-1/4 pt-3 text-start px-1">
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
                          ? "bg-amber-200"
                          : field.value === "High"
                          ? "bg-red-200"
                          : ""
                      } w-2/4 `}
                    >
                      <Button
                        variant="outline"
                        className={`gap-0 py-0 flex justify-between `}
                      >
                        {field.value ? field.value : "Select Priority"}
                        <ChevronDown />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full bg-slate-300 ">
                      <DropdownMenuLabel className="px-12">
                        Importance Level
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => field.onChange("Low")}
                        className={`bg-green-300 rounded-lg`}
                      >
                        {field.value === "Low" ? <CheckCheck /> : ""}
                        Low
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => field.onChange("Medium")}
                        className={`bg-amber-300 rounded-lg `}
                      >
                        {field.value === "Medium" ? <CheckCheck /> : ""}
                        Medium
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => field.onChange("High")}
                        className={`bg-red-300 rounded-lg `}
                      >
                        {field.value === "High" ? <CheckCheck /> : ""}
                        High
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isPersonal"
            render={({ field }) => (
              <FormItem className="flex space-y-0 p-1">
                <FormLabel className="w-1/4 pt-3 text-start px-1">
                  Personal
                </FormLabel>
                <FormControl className="w-3/4 pt-3 ">
                  <div className="flex space-x-1">
                    <Checkbox />
                    <p className="text-xs text-nowrap">
                      (Select Only if this Event is Personal)
                    </p>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-sky-200 w-2/5 flex"
            onClick={form.handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

const eventFormSchema = z.object({
  title: z.string().min(3).max(20),
  description: z.string().min(10).max(50).optional(),
  startDate: z.date(),
  endDate: z.date(),
  isImportant: z.string(),
  isPersonal: z.number(),
  users: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
      })
    )
    .min(0)
    .max(5, { message: "Only 5 guests are Allowed" })
    .optional(),
});
