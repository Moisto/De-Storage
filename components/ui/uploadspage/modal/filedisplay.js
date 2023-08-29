import { Button } from "@components/ui/shared";



export default function DisplayModal({fileDataUrl, fileNames, closeModal}) {
  

  return (
    <div
      style={{ background: "rgba(160, 150, 150, 0.54)" }}
      className="modal flex flex-col fixed left-[50%] translate-x-[-50%]  top-[20%] h-[15rem] w-[15rem] md:h-[25rem] md:w-[25rem]  backdrop-blur-sm bg-circleRed  m-auto p-2"
    >
      <div className="modal-content p-4 m-auto w-[100%] h-[80%]">
        <img src={fileDataUrl} alt={`Selected File`} className="w-[100%] h-[100%] " />
        {/* <p>{fileNames}</p> */}
      </div>

      <div className="w-[15%]">
        <button  
        className="text-black p-4"  
          onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};