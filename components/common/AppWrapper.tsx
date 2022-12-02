import { Button } from "@nextui-org/react";
import React, { FC, PropsWithChildren } from "react";
import { signOut } from "next-auth/react";
import Logo from "./Logo";
import { useRouter } from "next/router";
import ProfileDropdown from "./ProfileDropdown";

const AppWrapper: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
  };

  const handleAddPlace = () => {
    router.push("/places/add");
  };

  return (
    <div className="w-full min-h-[100vh] flex flex-col">
      <header className="h-24 bg-white flex items-center px-6 justify-between">
        <Logo />
        <div className="flex gap-2 items-center">
          <Button onClick={handleAddPlace}>Añadir vivienda</Button>
          <ProfileDropdown onSignOut={handleSignOut} />
        </div>
      </header>
      <main className="grow w-full flex flex-col">{children}</main>
      <footer className="h-24 bg-white"></footer>
    </div>
  );
};

export default AppWrapper;
