import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Events = () => {
  return (
    <div>
      <Card className="w-full bg-sky-100">
        <CardContent className="flex w-full h-64 p-4">
          <div className="w-1/3">
            <img
              src="https://picsum.photos/300/200?random=2"
              alt=""
              className="w-full h-56 object-cover rounded-md"
            />
          </div>
          <div className="w-2/3 flex flex-col m-1 ">
            <div className="h-14 flex items-center ">
              <h1>React State Management Simplified</h1>
            </div>
            <div className="h-28 flex items-center ">
              <p>
                A guide to managing state effectively in React applications.
              </p>
            </div>
            <div className="h-14 flex items-center">
              <Badge variant="outline">Web Develpoment</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Events;
