export interface Event {
  id: String;
  title: String;
  date: Date;
  startTime: String;
  endTime: String;
  description: String;
  location: String;
  isAllDay: Boolean;
  isDone: Boolean;
  isImportant: Boolean;
  isPersonal: Boolean;
  isWork: Boolean;
}

export const initialEvent: Event = {
  id: "",
  title: "",
  date: new Date(),
  startTime: "",
  endTime: "",
  description: "",
  location: "",
  isAllDay: false,
  isDone: false,
  isImportant: false,
  isPersonal: false,
  isWork: false,
};
