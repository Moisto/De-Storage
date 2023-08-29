import { Web3Button } from "@web3modal/react";
import Link from "next/link";

export default function Notconnected() {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      <p className="mt-[20px] font-bold text-[20px] text-center text-white">
        Please Connect your Wallet to Upload your file
      </p>
      <div className="flex flex-col items-center justify-center px-16 mt-20 gap-7">
        <Web3Button />
        <Link href="./">
          <p className="text-white">{"<<< Go back"}</p>
        </Link>
      </div>
    </div>
  );
}
