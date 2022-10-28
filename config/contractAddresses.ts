import { ChainId } from "@thirdweb-dev/sdk";
import { targetChainId } from "./targetChainConfig";

interface IAddresses {
  [key: string]: { [key: string]: string };
}

/***
 * Add your addresses + networks here.
 * To tell your app where to point to, change the targetChainId
 */
const ADDRESSES: IAddresses = {
  [ChainId.Polygon]: {
    Marketplace: "0x1487CD62b68457543B0B314ad67013a43efaB11C",
  },
};

export const readAppContractAddresses = (name: string) => {
  return ADDRESSES[targetChainId][name];
};
