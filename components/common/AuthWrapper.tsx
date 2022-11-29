import React, { FC, PropsWithChildren } from "react";

const AuthWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full min-h-[100vh] flex flex-col">
      <main className="grow w-full flex flex-col">{children}</main>
      <footer></footer>
    </div>
  );
};

export default AuthWrapper;
