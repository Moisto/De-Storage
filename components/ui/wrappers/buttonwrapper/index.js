import { Button } from "@components/ui/shared";
import Link from "next/link";

export default function ButtonWrapper() {
  return (
    <>
      <div className="absolute bottom-[-10px] md:relative flex justify-center py-10  w-full">
        <div
          style={{ background: "rgba(160, 150, 150, 0.54)" }}
          className="h-[220px] w-[220px] absolute bottom-[-50%] m-auto rounded-full  backdrop-blur-2xl z-[-1]"
        ></div>

        <Link href="/uploads">
          <button
            onClick={() => console.log("hey")}
            className={`py-4 px-8 bg-circleRed rounded-tl-[30px] rounded-br-[30px] text-white text-sm font-normal font-poppins hover:bg-circleRedHover`}
          >
            Start Uploading
          </button>
        </Link>
      </div>
    </>
  );
}
