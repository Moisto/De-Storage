import { Modal, UploadFiles, DisplayModal } from "@components/ui/uploadspage";
import { BaseLayout } from "@components/ui/layout";
import { Button, Navbar, Notconnected } from "@components/ui/shared";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NavWrapper } from "@components/ui/wrappers";
// import { web3ContextProvider } from "@components/context";
import { useWeb3Context } from "@components/context";
import { uploadfileToPinata } from "@components/ui/uploadfiles";
import { Loader } from "@components/ui/shared";
const { ethers } = require("ethers");


export default function Uploads() {
  // files
  const [selectedFile, setSelectedFile] = useState(null);

  const [fileDataUrls, setFileDataUrls] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [fileUri, setFileUri] = useState([]);

  // account
  const [account, setAccount] = useState()

  // Search for items
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { uploadfile, getDocuments, deleteDoc } = useWeb3Context();

  const fetchData = async () => {
    const filesUri = await getDocuments();
    console.log(filesUri.toString());

    const fetchRequests = filesUri.map(async (filesUri) => {
      const requestURL = `https://ipfs.io/ipfs/${filesUri}`;
      const filesMetadata = await (await fetch(requestURL)).json();
      const url = filesMetadata.fileURL;
      const name = filesMetadata.fileName;
      return { filesUri, url, name };
    });

    const results = await Promise.all(fetchRequests);
    // Update state after all fetch requests have completed
    const urls = results.map((result) => result.url);
    const names = results.map((result) => result.name);
    const uris = results.map((result) => result.filesUri);
    setFileDataUrls(urls);
    setFileNames(names);
    setFileUri(uris);
  };

  const handleFileChange = async (event) => {
    // show loader
    setLoadingMsg("Uploading your file to IPFS");
    setIsLoading(true);

    // Pinata/Ipfs Uploading
    const newFiles = event.target.files[0];
    const fileHash = await uploadfileToPinata(newFiles);

    if (fileHash == undefined) {
      setIsLoading(false);
    } else {
      setLoadingMsg("Please Confirm with your Wallet");
      const tx = await uploadfile(fileHash);
      setLoadingMsg("Uploading is being confirm");
      await tx.wait();
      await fetchData();
      setIsLoading(false);
      alert("Please reload to see your file");
    }
    setIsModalVisible(false);
  };
  console.log(selectedFile);

  const closeContentModal = () => {
    setIsModalVisible(false);
  };

  const handleFileClick = (fileDataUrl) => {
    setSelectedFile(fileDataUrl);
  };

  const closeModal = () => {
    setSelectedFile(null);
  };

  const handleSearch = () => {
    if (searchTerm === "") {
      setSearchResults([]);
      return;
    }

    // Filter based on file names
    const filteredFileNames = fileNames.filter((fileName) =>
      fileName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Use the filtered file names to get corresponding URLs from fileDataUrls
    const filteredFileDataUrls = filteredFileNames.map(
      (fileName) => fileDataUrls[fileNames.indexOf(fileName)]
    );

    // If any matching files found in selectedFiles, set them as searchResults
    if (filteredFileDataUrls.length > 0) {
      setSearchResults(filteredFileDataUrls);
    } else {
      setSearchResults([]);
    }
  };

  // Fetch the connected wallet's address
  async function getConnectedAddress() {
    const provider = new ethers.BrowserProvider(window.ethereum); // A connection to the Ethereum network
    const accounts = await provider.listAccounts();
    if (accounts.length > 0) {
      const address = accounts[0];
      console.log("Connected wallet address:", address.address);
      return address.address;
    } else {
      console.log("No wallet is connected.");
      return null;
    }
  }

  // Clear out search field when empty
  useEffect(() => {
    async function onLoad(){

    const connectedaccount =  await getConnectedAddress()
    if(connectedaccount != null){
      setAccount(connectedaccount)
      fetchData();
    } 
    }
    onLoad()
  }, []);

  // Modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  //Loading Visibility
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("Loading");

  // Add a deleteFile function to remove a file from the dashboard and selectedFiles array
  const deleteFile = async (fileToDelete) => {
    // Remove the file from the dashboard by filtering it out
    const index = fileDataUrls.indexOf(fileToDelete);
    const uriToDelete = fileUri[index];

    // Show loader
    setLoadingMsg("Deleting your file, Please Confirm");
    setIsLoading(true);

    // initial Delete Transaction
    const tx = await deleteDoc(uriToDelete);
    setLoadingMsg("Deleting is being confirm");
    await tx.wait();
    await fetchData();
    setIsLoading(false);

    const updatedSelectedFiles = fileDataUrls.filter(
      (file) => file !== fileToDelete
    );

    // Remove the file from searchResults if it exists
    const updatedSearchResults = searchResults
      ? searchResults.filter((file) => file !== fileToDelete)
      : [];

    // Update the selectedFiles state
    setFileDataUrls(updatedSelectedFiles);
    setSearchResults(updatedSearchResults);
  };

  return (
    <>
      {isLoading && <Loader msg={loadingMsg} />}
      <div
        className={`bg-gradient-radial from-grey to-grey2 relative   h-auto overflow-hidden  `}
      >
        <NavWrapper />

        <Navbar getConnectedAddress={getConnectedAddress} />
      {account ?
      <>
      

        {/* search for files */}
        <div className="flex justify-center">
          <div className=" md:w-[40%] flex justify-between text-center mt-10 px-8 py-3 bg-white rounded-[50px] border-[2px] border-circleRed">
            <input
              className="w-[100%] outline-none"
              placeholder="search files "
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            ></input>
            <button
              // value={searchTerm}
              onClick={handleSearch}
              variant="round"
              size="sm"
            >
              Search
            </button>
          </div>
        </div>
        {/* search for files Ends*/}

        {/* Displayed search items */}
        <div className="px-16 flex gap-7 mt-10">
          {searchResults.map((file, index) => (
            <div key={index}>
              <UploadFiles
                key={index}
                file={file}
                fileNames={fileNames[index]}
                fileDataUrl={fileDataUrls[index]}
              />
            </div>
          ))}
        </div>
        {/* Displayed search items end */}

        {/* Buttons */}
        <div className="flex px-16 mt-20 gap-7">
          <Link href="./">
            <Button>Back</Button>
          </Link>

          <Button visibility={setIsModalVisible}>Upload</Button>
        </div>
        {/* Buttons end */}

        {/* Contents dashboard */}
        <div
          style={{ background: "rgba(255, 255, 255, 0.26)" }}
          className="mt-10 md:px-16 w-full min-h-screen bg-indigo-400 border-circleRed border-t-2 backdrop-blur-[10px]"
        >
          <div className="grid text-center grid-cols-2 md:grid-cols-5 py-4 gap-y-12">
            {fileDataUrls.length > 0 &&
              fileDataUrls.map((file, index) => (
                <div key={index}>
                  <UploadFiles
                    key={index}
                    file={file}
                    fileNames={fileNames[index]}
                    fileDataUrl={fileDataUrls[index]}
                    index={index}
                    deleteFile={deleteFile}
                    onFileClick={() => handleFileClick(fileDataUrls[index])}
                  />
                </div>
              ))}
          </div>
        </div>
        {/* Contents dashboard ends */}

        {/* Modal */}
        {isModalVisible && (
          <Modal
            filechange={handleFileChange}
            closeContentModal={closeContentModal}
          />
        )}
        {/* Modal Ends */}
        {/*Content display Modal */}
        {selectedFile && (
          <DisplayModal
            fileDataUrl={selectedFile}
            fileNames={fileNames}
            closeModal={closeModal}
          />
        )}
              </>
        :<Notconnected/>}
      </div>
    </>
  );
}

Uploads.Layout = BaseLayout;
