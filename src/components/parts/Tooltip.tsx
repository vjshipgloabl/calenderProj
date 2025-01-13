import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleUserRound, CircleX, Eye, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export const ToolComponent = ({ user }: { user: any }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Eye className="mr-2" />
        </TooltipTrigger>
        <TooltipContent className="w-64 h-36 border-b border-sky-500 bg-sky-800 text-sky-200">
          <CircleUserRound className="w-12 h-12 ml-24" />
          <p className="mt-2 text-center">{user.name}</p>
          <p className="mt-1 text-center">{user.email}</p>
          <Button onClick={() => console.log(user.name)}>View Profile</Button>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const ClickEye = ({ user }: { user: any }) => {
  const [openProfile, setOpenProfile] = useState(false);
  return (
    <div>
      <Eye onClick={() => setOpenProfile(true)} />
      <AlertDialog open={openProfile} onOpenChange={setOpenProfile}>
        <AlertDialogContent className="border-none p-0 rounded-xl bg-sky-50">
          <AlertDialogHeader className="border-0 rounded-md">
            <AlertDialogDescription className="z-100 p-4 bg-sky-100 rounded-lg flex">
              <div className="w-4/5 ">
                <div className="flex space-x-2 border-none items-center">
                  <div className="h-16 rounded-full bg-sky-800">
                    <CircleUserRound className="w-16 h-16 text-sky-200 rounded-xl" />
                  </div>
                  <div className="w-full h-24 pl-2 py-5 flex flex-col items-start text-sky-800 text-lg">
                    <h3 className="font-serif font-bold mx-2 pb-2">
                      {user.name}
                    </h3>
                    <h4 className="font-serif mx-2 text-sm">{user.email}</h4>
                  </div>
                </div>
              </div>
              <div className="w-1/5 h-2/5  flex items-end justify-end pr-2 pb-2">
                <X
                  className="w-7 h-7 text-sky-800"
                  onClick={() => setOpenProfile(false)}
                />
              </div>

              {/* <div className="flex justify-end">
                <CircleX className="" onClick={() => setOpenProfile(false)} />
              </div>
 */}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
