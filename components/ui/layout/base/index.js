

// import { Web3Provider } from "@components/providers";

import { Poppins, Inter, Roboto } from "next/font/google";






const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "400", "500", "600", "700"],
});

// const roboto = Roboto({
//   subsets: ["latin"],
//   variable: ["--font-roboto"],
//   weight: ["400"],
// });

// const inter = Inter({
//   subsets: ["latin"],
//   variable: ["--font-inter"],
//   weight: ["400"]
// })

export default function BaseLayout({ children }) {
  return (
    <>
     
        <div className={`${poppins.variable}  font-poppins  md:max-w-full m-auto `}>
          {children}
        </div>
      
    </>
  );
}
