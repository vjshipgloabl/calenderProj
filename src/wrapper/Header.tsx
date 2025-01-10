import CalendarImage from "../assets/calendar(1).png"; // Adjust path based on your folder structure

export const Header = () => {
  return (
    <div className="top-0 z-0 fixed absolute w-full h-16 bg-sky-600 text-sky-200 text-lg rounded-b-xl font-sans flex justify-between px-16">
      <div className="flex w-2/12 justify-center items-center">
        <img src={CalendarImage} alt="Logo" className="h-10 w-10" />
        <span className=" pl-4">Event Management</span>
      </div>
      <div className="flex space-x-4 justify-center items-center pr-4">
        <h1>About</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
      </div>
    </div>
  );
};
