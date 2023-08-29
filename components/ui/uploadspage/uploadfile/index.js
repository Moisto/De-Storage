import Image from "next/image";
import { useEffect, useRef, useState } from "react";




function downloadFile(fileDataUrl, fileName) {
  const anchor = document.createElement("a");
  anchor.href = fileDataUrl;
  anchor.download = fileName;
  anchor.click();
}






export default function UploadFiles({
  key,
  fileNames,
  searchResults,
  file,
  fileDataUrl,
  index,
  deleteFile,
  onFileClick,

}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  

  const isSearchResult = searchResults !== undefined;
  // const file = isSearchResult ? searchResults[index] : fileDataUrl;




  return (
    <>
      {/* File Start */}
      <div
        className="w-[10rem] h-[12rem] md:w-[12rem] md:h-[14rem] bg-lessWhite rounded-[10px] p-2 m-auto flex flex-col justify-center "
        style={{ background: "rgba(160, 150, 150, 0.54)" }}
        src={isSearchResult ? searchResults : undefined}
      >
        <div
          className="cursor-pointer h-[60%] w-[100%] p-2 border-[1px] backdrop-blur-lg shadow-inner  rounded-[10px]"
          style={{ background: "rgba(160, 150, 150, 0.64)" }}
          onClick={onFileClick}
        >
          <Image
          width={500}
          height={500}
            src={fileDataUrl}
            alt={`Selected File ${index + 1}`}
            className="w-[100%] h-[100%]"
          />
        </div>

        <div className="px-2 w-[100%]  h-[40%] flex justify-between items-center text-center gap-2">
          {/* Icon */}
          <span>
            <Image
            width={500}
            height={500}
              className="w-7 h-7 "
              alt=""
              src="/c144927d-03d3-47bf-a4cc-e450f712d1b8.svg"
            ></Image>
          </span>
          {/* Icon */}

          {/* File name */}
          <span className="text-center w-[50%]">
            <div className="text-sm overflow-hidden">
              <p>{fileNames}</p>
            </div>
          </span>
          {/* File name */}

          {/* Drop down */}

          <span className="dropdown text-black " ref={dropdownRef}>
            <div
              className="dropdown-toggle flex flex-col gap-[2px]"
              onClick={toggleDropDown}
            >
              <span className="block  w-[10px] h-[8px] rounded-full bg-white"></span>
              <span className="block  w-[10px] h-[8px] rounded-full bg-white"></span>
              <span className="block  w-[10px] h-[8px] rounded-full bg-white"></span>
            </div>

            <ul className={` dropdown-menu ${isOpen ? "open" : ""} `}>
              <li 
                onClick={() => deleteFile(file)}>Delete
              </li>
              <li>Share</li>
              <li 
                onClick={() => downloadFile(fileDataUrl, fileNames)}>
                Download
              </li>
              
            </ul>
          </span>
        </div>
      </div>
    </>
  );
}
