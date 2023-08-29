import axios from "axios";

const JWT = process.env.NEXT_PUBLIC_PINATA_JWT;
const metadataTemplate = {
  fileName: "",
  fileURL: "",
};
const extensionsToRemove = [".jpg", ".gif", ".pdf", ".png", ".jpeg", ".avif"];

export default async function uploadfileToPinata(file) {
  const formData = new FormData();

  formData.append("file", file);

  const metadata = JSON.stringify({
    name: file.name,
  });
  formData.append("pinataMetadata", metadata);

  const options = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", options);
  console.log(formData);
  console.log(JWT);

  try {
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          "Content-Type": `multipart/form-data`,
          Authorization: `Bearer ${JWT}`,
        },
      }
    );
    const fileHash = response.data.IpfsHash;
    console.log(fileHash);
    return await uploadJsonToPinata(file, fileHash);
  } catch (error) {
    alert("Error Uploading File to IPFS");
    console.log(error);
  }
}

async function uploadJsonToPinata(file, fileHash) {
  let metadata = { ...metadataTemplate };
  metadata.fileName = file.name.replace(
    new RegExp(extensionsToRemove.join("|"), "gi"),
    ""
  );
  metadata.fileURL = `https://ipfs.io/ipfs/${fileHash}`;
  try {
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      metadata,
      {
        headers: {
          accept: "application/json",
          "Content-Type": `application/json`,
          Authorization: `Bearer ${JWT}`,
        },
      }
    );
    return response.data.IpfsHash;
  } catch (error) {
    alert("Error Uploading JSON to IPFS");
    console.log(error);
  }
}
