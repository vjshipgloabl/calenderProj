import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalenderView } from "./CalenderView";

const Dashboard = () => {
  return (
    <div className="sm:flex">
      <CalenderView />
      <EventsCard2 />
    </div>
  );
};
export default Dashboard;

const EventsCard2 = () => {
  return (
    <Card className="w-1/3 max-h-screen ml-2 rounded-3xl bg-sky-900">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};
