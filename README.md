This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
![Screenshot 2023-08-29 105629](https://github.com/Moisto/De-Storage/assets/109590770/f4a9d1d9-f923-4486-a619-5971f7b4f769)

# DESTORAGE
Destorage is a cutting-edge Web3 decentralized storage web application designed to provide users with a secure and efficient way to store and manage their data on decentralized networks. With Destorage, you can enjoy the benefits of blockchain technology, including data security, privacy, and fast data access times.
## Features
* Decentralized Storage: Leverage the power of decentralization to ensure your data is secure and resilient to failures.

* User-Friendly Interface: Enjoy a seamless experience with our intuitive and user-friendly interface.

* Blazing-Fast Speed: Say goodbye to slow data transfer times, thanks to our lightning-fast network.

* End-to-End Encryption: Your data is always encrypted, ensuring your privacy and security.

* Cross-Platform Compatibility: Access your files from any device and operating system.

  ## Technologies
  Technologies that were used in building this application

  * Next.js and Tailwind css -  For building an interactive an fast user experience
  * Solidity - For writing the smart contract
  * Ethers.js - For connecting with Metamask providers
    

## Deployed App
Public url: https://de-storage.brimble.app/

### How it works
* Connect your Metamask Wallet and connect to Avalanche Network
* Click on Start Uploading
* Click on upload Button to upload your desired files
* View and download your files from any device anywhere in the world.

## Project Structure
####
```
project-root/
│
├── components/
│   ├── context/
│   ├── providers/
│   ├── ui/
│   └── ...
│
├── pages/
│   ├── _app.js           
│   ├── _eerror.js
|   ├── index.js
│   └── ...
│
├── public/
│   └── ...
│
├── styles/
│   ├── globals.css             # API utility functions
│   └── ...
│
├── test/
│   ├── .gitkeep
│   └── ...
│
├── jsonconfig.json
├── next.config.json
├── package.json
└── ...

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```



Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.