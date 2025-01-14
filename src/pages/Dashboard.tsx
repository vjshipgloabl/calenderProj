import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalenderView } from "./CalenderView";

const Dashboard = () => {
  return (
    <div className="sm:flex">
      <CalenderView />
      <UpComingEvents />
    </div>
  );
};
export default Dashboard;

const UpComingEvents = () => {
  return (
    <Card className="md:w-1/3 w-full max-h-screen md:ml-2 rounded-3xl bg-sky-200 text-sky-800">
      <CardHeader>
        <CardTitle>Up Coming Events</CardTitle>
      </CardHeader>
      <CardContent className="">
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};
