import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { allBlogs } from "@/assets/content";

const Events = () => {
  return (
    <>
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
      <div className="grid grid-cols-3 gap-2 mt-2">
        {allBlogs.map((b) => (
          <Card className=" h-full bg-sky-50 rounded-lg">
            <div className="w-full p-2 space-y-2 text-sky-800">
              <img
                src={b.image}
                alt="Blogsss"
                className="w-full object-cover rounded-md"
              />
              <Badge variant="primary" className="bg-green text-white">
                {b.category}
              </Badge>

              <div className="h-6 flex items-center pt-4 pb-4">
                <h1 className=" font-bold text-md ">{b.title}</h1>
              </div>
              <div className="h-fit flex items-center ">
                <p>{b.content}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Events;

// function formatParagraphs(text: string) {
//   return text
//     .split("\n")
//     .map((paragraph: any) => {
//       if (paragraph.trim() === "") return paragraph;
//       const firstChar = paragraph.charAt(0).toUpperCase();
//       const rest = paragraph.slice(1);
//       return `<b class="text-2xl font-extrabold font-sans">${firstChar}</b>${rest}`;
//     })
//     .join("\n");
// }
