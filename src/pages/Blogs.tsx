import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { allBlogs } from "@/assets/content";
import { ButtonCard } from "@/components/ButtonCard";

const Blogs = () => {
  const showDetails = (title: any) => {
    const details = allBlogs.filter((blog) => blog.title === title);
    console.log(details);
  };
  console.log(allBlogs);

  return (
    <>
      <div className="w-full bg-transparent">
        <div className="flex justify-between items-center mt-2 mb-4">
          <h1 className="text-4xl font-bold font-sans pl-12">Blogs</h1>
          <ButtonCard />
        </div>
        <div className="md:grid w-full relative xl:grid-cols-2 md:grid-cols-2 text-sky-800 ">
          {allBlogs.map((blog, index) => {
            return (
              <div onClick={() => showDetails(blog.title)}>
                <CardContainer key={index} className="inter-var">
                  <CardBody className="group/card  w-auto sm:w-[30rem] h-72 rounded-xl md:pl-16 md:pr-16 lg:pl-12 lg:pr-12">
                    <CardItem
                      translateZ="0"
                      rotateX={0}
                      rotateY={0}
                      className="w-full "
                    >
                      <img
                        src={blog.image}
                        className="h-64 w-full object-cover rounded-xl group-hover/card:shadow-xl opacity-70"
                        alt="thumbnail"
                      />
                      <CardItem
                        translateZ="50"
                        className="text-xl w-full font-bold text-neutral-600 absolute inset-0  px-4 "
                      >
                        <TextGenerateEffect words={blog.title} />
                      </CardItem>
                      <CardItem
                        translateZ="50"
                        className="p-4 font-bold text-white justify-between w-full absolute flex text-sm inset-0 mt-52"
                      >
                        <div className="w-1/2 flex justify-items-center justify-start">
                          <div className="flex w-16 h-8 ">
                            <ThumbsUp color="white" />
                            <span className="ml-2 mt-1">24</span>
                          </div>
                          <div className="flex w-24 h-24">
                            <MessageCircle color="white" />
                            <span className="ml-2 mt-1">24</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-white text-sm">{blog.category}</p>
                        </div>
                      </CardItem>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Blogs;
