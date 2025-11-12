import { PinataSDK } from "pinata";
import toast from "react-hot-toast";

export const trimAddress = (address) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatFirstName = (name) => {
  if (!name) return "";
  const names = name.split(" ");
  if (names.length === 1) return names[0];
  return names[0];

}
const pinata = new PinataSDK({
  pinataJwt: import.meta.env.VITE_PINATA_JWT,
  pinataGateway: import.meta.env.VITE_PINATA_GATEWAY,
});

export const uploadImageVideoFile = async (
  e,
  imageFile,
  videoFile,
  documentFile = "",
  toastId
) => {
  e.preventDefault();
  let documentCid = null;
  try {
    const ImageUpload = await pinata.upload.public.file(imageFile);
    const imageCid = ImageUpload.cid;

    const videoUpload = await pinata.upload.public.file(videoFile);
    const videoCid = videoUpload.cid;

    if (documentFile) {
      const documentUpload = await pinata.upload.public.file(documentFile);
      documentCid = documentUpload.cid;
    }

    console.log("files uploaded successfully");
    toast.success("files uploaded successfully, creating transaction", { id: toastId });
    
    return {
      imageCid: imageCid,
      videoCid: videoCid,
      documentCid: documentCid,
    };
  } catch (e) {
    console.error(e);
    toast.success("failed to upload files, please try again", { id: toastId });
  }
};
