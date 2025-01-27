import {
  BookOpenCheck,
  CalendarDays,
  LayoutDashboard,
  ListTodo,
  PlusCircle,
  Settings,
  UserCircle,
} from "lucide-react";

export const Sidebar = () => {
  return (
    <div className="flex z-20 fixed mt-14 bg-sky-100">
      <aside className="min-h-screen w-60 m-4">
        <div className=" mt-4 mb-4 space-y-3">
          <div className="flex flex-col justify-center items-center font-sans w-full font-semibold text-black ">
            <UserCircle size={30} className=" " />
            <p className="">Admin </p>
          </div>
        </div>

        <nav>
          {MenuOptions.map((menu) => (
            <a
              href={menu.link}
              key={menu.name}
              className="items-center w-full mt-2 flex p-1 pl-8 border-2 rounded-lg hover:border-sky-800 hover:bg-sky-200 cursor-pointer "
            >
              {menu.icon ? menu.icon : <PlusCircle className="w-10 h-10" />}
              <div className=" pl-4 font-sans font-medium ">{menu.name}</div>
            </a>
          ))}
        </nav>
      </aside>
    </div>
  );
};

const MenuOptions = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={18} />,
    link: "/",
  },
  {
    name: "My Events",
    icon: <CalendarDays size={18} />,
    link: "/event",
  },
  {
    name: "My Todos",
    icon: <ListTodo size={18} />,
    link: "/calendar",
  },
  {
    name: "My Blog",
    icon: <BookOpenCheck size={18} />,
    link: "/blogs",
  },
  {
    name: "Settings",
    icon: <Settings size={18} />,
    link: "/settings",
  },
];
