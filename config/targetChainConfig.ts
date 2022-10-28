import { ChainId } from "@thirdweb-dev/sdk";

export const targetChainId = ChainId.Polygon;

/***
 * Need to add support for your own network
 */
export const getEtherscanURL = () => {
  if (targetChainId === ChainId.Polygon) {
    return "https://polygonscan.com";
  } else {
    console.log("Please add blockchain scan-site URL for your network");
    return undefined;
  }
};
