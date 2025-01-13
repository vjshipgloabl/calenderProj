export interface Event {
  id: String;
  title: String;
  date: Date;
  startDate: String;
  endDate: String;
  description: String;
  location: String;
  isAllDay: boolean;
  isDone: boolean;
  isImportant: boolean;
  isPersonal: boolean;
  isWork: boolean;
  users: [];
}

export const initialEvent: Event = {
  id: "",
  title: "",
  date: new Date(),
  startDate: "",
  endDate: "",
  description: "",
  location: "",
  isAllDay: false,
  isDone: false,
  isImportant: false,
  isPersonal: false,
  isWork: false,
  users: [],
};
