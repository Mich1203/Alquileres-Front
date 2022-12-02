import { useRouter } from "next/router";
import React, { FC } from "react";

const Logo: FC = () => {
  const router = useRouter();
  return (
    <div
      className="bg-[#FF4C29] rounded-full h-20 w-48 flex items-center justify-center cursor-pointer"
      onClick={() => router.push("/")}
    >
      <text className="font-['Ubuntu', sans-serif] text-4xl text-black font-semibold">
        ZaRa-Rent
      </text>
    </div>
  );
};

export default Logo;
