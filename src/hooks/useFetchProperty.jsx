import { useIotaClientQuery } from "@iota/dapp-kit";
import { useNetworkVariables } from "../config/networkConfig";
import { useEffect, useState } from "react";

export const useFetchProperty = () => {
  const { propatradexPackageId } = useNetworkVariables("propatradexPackageId");
  const [propertyDetails, setPropertyDetails] = useState([]);
  const { data, isPending, isError } = useIotaClientQuery(
    "queryEvents",
    {
      query: {
        MoveEventType: `${propatradexPackageId}::propatradex::PropertyListed`,
      },
    },
    {
      select: (data) => data.data.flatMap((x) => x.parsedJson),
    }
  );

  const propertyId = data?.map((property) => property.property_id) || [];

  const { data: propertyObject } = useIotaClientQuery(
    "multiGetObjects",
    {
      ids: propertyId,
      options: {
        showContent: true,
        showOwner: true,
      },
    },
    {
      enabled: propertyId.length > 0,
      select: (data) =>
        data.map((x) => x.data?.content?.fields).filter(Boolean),
    }
  );

  useEffect(() => {
    console.log("fetching...");

    if (!isPending && propertyObject) {
      setPropertyDetails(propertyObject);
      console.log("propertyDetails:", propertyObject);
      console.log("fetched");
    }
    if (isError) {
      console.error("Error fetching property details");
    }
  }, [isPending, propertyObject]);

  return {
    propertyDetails,
    isPending,
    isError,
  };
};
