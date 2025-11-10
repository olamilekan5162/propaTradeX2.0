import { createNetworkConfig } from "@iota/dapp-kit";
import { getFullnodeUrl } from "@iota/iota-sdk/client";
import {
  TESTNET_PROPATRADEX_PACKAGE_ID,
  TESTNET_PROPATRADEX_ADMIN_CAP,
  TESTNET_PROPATRADEX_UPGRADE_CAP,
  TESTNET_PROPATRADEX_PROFILE_REGISTRY,
} from "./constants.js";

const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
    testnet: {
      url: getFullnodeUrl("testnet"),
      variables: {
        propatradexPackageId: TESTNET_PROPATRADEX_PACKAGE_ID,
        propatradexAdminCap: TESTNET_PROPATRADEX_ADMIN_CAP,
        propatradexUpgradeCap: TESTNET_PROPATRADEX_UPGRADE_CAP,
        propatradexProfileRegistry: TESTNET_PROPATRADEX_PROFILE_REGISTRY,
      },
    },
  });

export { useNetworkVariable, useNetworkVariables, networkConfig };
