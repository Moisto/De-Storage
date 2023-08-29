import "@styles/globals.css";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { avalancheFuji, arbitrumGoerli } from "wagmi/chains";
import { MoralisProvider } from "react-moralis";
import { Web3ContextProvider } from "@components/context";

const chains = [avalancheFuji, arbitrumGoerli];
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECTID;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

function App({ Component, pageProps }) {
  const Layout = Component.Layout;

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Web3ContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Web3ContextProvider>
      </WagmiConfig>
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeVariables={{
          "--w3m-font-family": "Roboto, sans-serif",
          "--w3m-accent-color": "#682314",
        }}
        defaultChain={avalancheFuji}
      />
    </>
  );
}

export default App;
