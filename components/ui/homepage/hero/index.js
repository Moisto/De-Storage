import Image from "next/image";







export default function Hero() {
  
  return (
    <>
      <div className="flex-col md:flex-row w-[90%] md:w-[70%] py-2  mx-auto  flex justify-center  items-center  gap-5">
        <div className=" ">
          <h1 className="text-[1.5rem] text-center md:text-left font-[800] md:text-[2.4rem] mb-2">
            <span style={{ color: "rgba(0, 0, 0, 0.8)" }}>
              &quot;Unleash the Potential of Your Data:
            </span>{" "}
            <span style={{ color: "rgba(0, 0, 0, 0.6)" }}>
              Store Safely and Securely with Blockchain Decentralized
              Cloud&quot;
            </span>
          </h1>

          <div className="flex items-center  gap-[8%]  text-black font-bold ">
            <span className="w-[4px] h-[35px] bg-white"></span>
            <span>Easy</span>
            <span className="w-[4px] h-[35px] bg-white"></span>
            <span>Fast</span>
            <span className="w-[4px] h-[35px] bg-white"></span>
            <span>Secure</span>
            <span className="w-[4px] h-[35px] bg-white"></span>
          </div>
        </div>

        <Image
          width={500}
          height={500}
          className="my-5 md:my-0 h-[60vw] md:h-[30vw]  "
          alt=""
          src="/undraw_ether_re_y7ft (1) 1.png"
        ></Image>
      </div>
    </>
  );
};
