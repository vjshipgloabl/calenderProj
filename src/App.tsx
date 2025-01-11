import "react-big-calendar/lib/css/react-big-calendar.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EventsRoutes from "./routes/Events";

function App() {
  const router = createBrowserRouter([EventsRoutes()]);
  console.log("staging", import.meta.env);
  return <RouterProvider router={router} />;
}

export default App;
