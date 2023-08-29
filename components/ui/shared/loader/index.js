import loader from "./loader.svg";
import spinner from "@components/ui/shared/loader/";

export default function Loader(msg) {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      <img
        src="https://ipfs.io/ipfs/QmZTtnZF5dfrfSCGgL94hPiPPtcHexKQAcN29fofo6KymM"
        alt="loader"
        className="w-[100px] h-[100px] object-contain"
      />
      <p className="mt-[20px] font-bold text-[20px] text-center text-white">
        {msg.msg} <br /> Please wait...
      </p>
    </div>
  );
}
