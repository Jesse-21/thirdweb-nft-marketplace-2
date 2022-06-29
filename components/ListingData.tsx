import * as React from "react";
import InfoElement from "./InfoElement";
import { DirectListing } from "@thirdweb-dev/sdk/dist/node";
import { formatDisplayAddress, hexToETH, hextoNum } from "../web3utils";
import { AuctionListing } from "@thirdweb-dev/sdk/dist/src/types/marketplace";
import LargeInfoText from "./LargeInfoText";
export const ListingData: React.FC<{
  listing: AuctionListing | DirectListing;
  handleBuy: any;
}> = ({ listing, handleBuy }) => {
  if (!listing) return <LargeInfoText message={"Nothing to Display"} />;
  return (
    <>
      <div id={"listing info"} className="ml-6 mt-1">
        <div className="font-josephin text-4xl font-semibold" id="title">
          {listing?.asset.name} (#{hextoNum(listing?.asset.id!)})
        </div>
        <div className="pl-1">{listing?.asset.description}</div>
      </div>
      <div id="sell-data" className="flex flex-col">
        <InfoElement
          name="Listing Price"
          data={`${hexToETH(listing.buyoutPrice)} ⧫`}
        />
        <InfoElement
          name="Seller"
          data={formatDisplayAddress(listing.sellerAddress)}
        />
        <div
          id="buy-button"
          onClick={handleBuy}
          className="rounded-3xl bg-slate-900 p-2 text-center text-lg font-semibold text-slate-200 transition ease-in-out hover:border-4 hover:border-slate-200 hover:shadow-lg  active:scale-105"
        >
          Buy for {hexToETH(listing.buyoutPrice)} ⧫
        </div>
      </div>
    </>
  );
};

export default ListingData;
