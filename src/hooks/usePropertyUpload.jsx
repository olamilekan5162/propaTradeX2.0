import toast from "react-hot-toast";
import { useNetworkVariables } from "../config/networkConfig";
import { Transaction } from "@iota/iota-sdk/transactions";
import {
  useIotaClient,
  useSignAndExecuteTransaction,
} from "@iota/dapp-kit";

export const usePropertyUpload = () => {
  const {
    propatradexPackageId,
  } = useNetworkVariables(
    "propatradexPackageId",
    "propatradexAdminCap",
    "propatradexUpgradeCap",
    "propatradexProfileRegistry"
  );

  const iotaClient = useIotaClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const uploadProperty = async (listingType, formData, cids, toastId) => {
    if (!formData || !cids) {
      toast.error("Form data are missing");
      return;
    }
    try {
      const tx = new Transaction();

      tx.moveCall({
        arguments: [
          tx.pure.u8(listingType === "sale" ? 1 : 2),
          tx.pure.u64(Number(formData.price)),
          tx.pure.string(formData.propertyAddress),
          tx.pure.string(formData.propertyType),
          tx.pure.string(formData.description),
          tx.pure.vector("string", [
            `https://${import.meta.env.VITE_PINATA_GATEWAY}/ipfs/${
              cids.imageCid
            }`,
          ]),
          tx.pure.string(
            `https://${import.meta.env.VITE_PINATA_GATEWAY}/ipfs/${
              cids.videoCid
            }`
          ),
          tx.pure.option(
            "string",
            listingType === "sale"
              ? `https://${import.meta.env.VITE_PINATA_GATEWAY}/ipfs/${
                  cids.documentCid
                }`
              : ""
          ),
          tx.pure.option(
            "u64",
            listingType === "rent" ? Number(formData.monthlyRent) : 0
          ),
          tx.pure.option(
            "u64",
            listingType === "rent" ? Number(formData.rentalPeriod) : 0
          ),
          tx.pure.option(
            "u64",
            listingType === "rent" ? Number(formData.depositReqiured) : 0
          ),
          tx.object("0x6"),
        ],
        target: `${propatradexPackageId}::propatradex::list_property`,
      });


      signAndExecute(
        { transaction: tx },
        {
          onSuccess: async ({ digest }) => {
            const { effects } = await iotaClient.waitForTransaction({
              digest,
              options: { showEffects: true },
            });
            if (effects?.status?.status === "success") {
              toast.success("Property uploaded successfully", { id: toastId });
            } else {
              toast.error("Upload failed, try again", {
                id: toastId,
              });
            }
            window.location.reload();
          },
          onError: (error) => {
            toast.error(`Upload failed, try again.`, {
              id: toastId,
            });
            console.error(error.message);
          },
        }
      );
    } catch (error) {
      toast.error("An unexpected error occurred", error.message, {
        id: toastId,
      });
      console.log("An unexpected error occurred", error);
    }
  };

  return {
    uploadProperty,
  };
};
