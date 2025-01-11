import useMediaQuery from "@/hooks/useMediaQuery";
import CalendarImage from "../assets/calendar(1).png";
import { EqualApproximately } from "lucide-react";

export const Header: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 470px)");

  return <>{isMobile ? <MobileView /> : <BigUiView />}</>;
};

const MobileView = () => {
  return (
    <>
      <div className="top-0 z-100 fixed absolute w-full h-16 bg-sky-600 text-sky-200 text-lg rounded-b-xl font-sans flex justify-between">
        <div className="flex w-2/6 justify-center items-center pl-8">
          <img src={CalendarImage} alt="Logo" className="h-8 w-8" />
          <span className="text-sm pl-1 text-nowrap">Event Management</span>
        </div>
        <div className="flex justify-center items-center pr-6">
          <EqualApproximately />
        </div>
      </div>
    </>
  );
};

const BigUiView = () => {
  return (
    <div className="top-0 z-100 fixed absolute w-full h-16 bg-sky-600 text-sky-200 text-lg rounded-b-xl font-sans flex justify-between px-16">
      <div className="flex w-2/12 justify-center items-center">
        <img
          src={CalendarImage}
          alt="Logo"
          className="h-10 w-10 cursor-pointer"
        />
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
