import { ChainId } from "@thirdweb-dev/sdk";

export const targetChainId = ChainId.Mumbai;

/***
 * Need to add support for your own network
 */
export const getEtherscanURL = () => {
  if (targetChainId === ChainId.Mumbai) {
    return "https://mumbai.polygonscan.com";
  } else {
    console.log("Please add etherscan URL for your network");
    return undefined;
  }
};
