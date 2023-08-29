import React, { createContext, useContext } from "react";
import { contractAddress, abi } from "./contract";
// import { ethers } from "ethers";
import { ethers } from "ethers";

const Web3Context = createContext();

export function useWeb3Context() {
  return useContext(Web3Context);
}
export function Web3ContextProvider({ children }) {

  const getContract = async () => {
    if (window.ethereum) {
      const chainId = parseInt(window.ethereum.chainId);
      const address = chainId in contractAddress ? contractAddress[chainId][0]: null;
      console.log(address)
      const provider = new ethers.BrowserProvider(window.ethereum); // A connection to the Ethereum network
      const signer = await provider.getSigner(); // Holds your private key and can sign things
      const Contract = new ethers.Contract(address, abi, signer);
      return Contract;
    } else {
      alert("No wallet detected");
    }
  };

  const getDocuments = async () => {
    const deContract = await getContract();
    const docs = await deContract.getDocuments();
    return docs;
  };

  const uploadfile = async (file) => {
    try {
      const deContract = await getContract();
      return await deContract.addDoc(file);
    } catch (error) {
      alert("Error Uploading File");
      console.log(error);
    }
  };

  const sendDoc = async (to, file) => {
    try {
      const deContract = await getContract();
      return await deContract.sendDoc(to, file);
    } catch (error) {
      alert("Error Sending Files");
      console.log(error);
    }
  };
  const deleteDoc = async (file) => {
    try {
      const deContract = await getContract();
      return await deContract.deleteDoc(file);
    } catch (error) {
      alert("Error Deleting Files");
      console.log(error);
    }
  };

  return (
    <Web3Context.Provider value={{ uploadfile, getDocuments, deleteDoc }}>
      {children}
    </Web3Context.Provider>
  );
}
