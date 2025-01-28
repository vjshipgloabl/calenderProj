import { allBlogs } from "@/assets/content";
import { ButtonCard } from "@/components/ButtonCard";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const Blogs = () => {
  const showDetails = (title: any) => {
    const details = allBlogs.filter((blog) => blog.title === title);
    console.log(details);
  };
  console.log(allBlogs);

  return (
    <>
      <div className="w-full bg-transparent">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold font-sans ">Blogs</h1>
          <ButtonCard />
        </div>
        <div className="md:grid w-full relative xl:grid-cols-3 gap-4 md:grid-cols-2 text-sky-800 ">
          {allBlogs.map((b) => {
            return (
              <div onClick={() => showDetails(b.title)}>
                <Card className=" h-full bg-sky-50 rounded-lg">
                  <div className="w-full space-y-2 text-sky-800">
                    <img
                      src={b.image}
                      alt="Blogsss"
                      className="w-full object-cover rounded-t-md"
                    />
                    <div className="p-2 px-2 h-36">
                      <Badge
                        variant="primary"
                        className="bg-green text-white h-4"
                      >
                        {b.category}
                      </Badge>
                      <div className=" my-1">
                        <h1 className="font-bold text-lg leading-tight">
                          {b.title}
                        </h1>
                      </div>
                      <div className="">
                        <p className="text-sm">{b.content}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Blogs;
