import { UpComingEvents } from "@/components/UpcomingEvents";
import { CalenderView } from "./CalenderView";
import useMediaQuery from "@/hooks/useMediaQuery";

const Dashboard = () => {
  const isMobile = useMediaQuery("(max-width: 1020px)");
  return (
    <>
      <div className="sm:flex h-screen w-full space-x-3">
        <CalenderView />
        {!isMobile && <UpComingEvents />}
      </div>
    </>
  );
};
export default Dashboard;
