import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { BaseLayout } from "@components/ui/layout";
import { Hero } from "@components/ui/homepage";
import { Button, Button2, Navbar, WalletBar } from "@components/ui/shared";
import { useEnsName, useEnsAvatar } from "wagmi";
import Link from "next/link";

import { ButtonWrapper, NavWrapper } from "@components/ui/wrappers";

// import Image from "next/image";

export default function Home() {
  const [username, setUsername] = useState("");
  const [network, setNetwork] = useState("");
  const [avatar, setAvatar] = useState("");
  const [account, setAccount] = useState("");

  async function getNetwork() {
    const provider = new ethers.BrowserProvider(window.ethereum); // A connection to the Ethereum network
    const network = await provider.getNetwork();
    setNetwork(network.name);
    return network.name;
  }
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

  async function getAddressFromENS() {
    // Check if the window object is available (browser context)
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth_goerli")
      // const provider = new ethers.providers.JsonRpcProvider("	https://rpc.ankr.com/eth_goerli")
      const userAddress = await getConnectedAddress()
        // Resolve the ENS name associated with the Ethereum address
        const ensName = await provider.lookupAddress(userAddress);

        if (ensName) {
          console.log(`ENS name for address ${userAddress}: ${ensName}`);
          return ensName;
        } else {
          console.log(`No ENS name found for address ${userAddress}`);
          return null;
        }
      } catch (error) {
        console.error("Error fetching ENS name:", error);
        return null;
      }
    } else {
      console.error(
        "MetaMask or a compatible Ethereum provider is not detected."
      );
      return null;
    }
  }
  // const userAddress = await getConnectedAddress();
  const ensName = useEnsName({ account, chainId: 5 })
  const ensAvatar = useEnsAvatar({ name: ensName.data, chainId: 5 })

function ens(){
  setAvatar(ensAvatar.data)
  console.log(avatar)
}
  useEffect(() => {
    async function onload() {
      const userAddress = await getConnectedAddress();
      setAccount(userAddress)
      const name = await getAddressFromENS(userAddress);
      if (name != null) {
        setUsername(name);
      } else {
        setUsername(userAddress);
      }
      ens()
    }
    onload();
    getNetwork();
  }, []);
  return (
    <>
      <div
        className={`bg-gradient-radial from-grey to-grey2 relative h-[auto]  md:h-auto overflow-hidden  `}
      >
        <NavWrapper />

        <Navbar />
        <WalletBar userAddress={username} network={network} avatar={avatar} />
        <Hero />
        <ButtonWrapper />
      </div>
    </>
  );
}

Home.Layout = BaseLayout;
