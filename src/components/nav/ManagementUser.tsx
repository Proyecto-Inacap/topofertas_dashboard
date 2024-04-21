"use client";
import React from "react";
import ThemeSwitch from "../ThemeSwitch";
import TooltipWrapper from "../TooltipWrapper";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { DoorOpenIcon } from "lucide-react";

const ManagementUser = () => {
  return (
    <div className="flex gap-2 items-center">
      <ThemeSwitch />
      <TooltipWrapper content="Cerrar sesión">
        <Button
          variant={"outline"}
          onClick={() =>
            signOut({
              callbackUrl: "/login",
            })
          }
        >
          <div className="flex gap-2 items-center">
            <DoorOpenIcon className="w-6 h-6" />
            <span>Salir</span>
          </div>
        </Button>
      </TooltipWrapper>
    </div>
  );
};

export default ManagementUser;
