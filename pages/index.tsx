import type { NextPage } from 'next'
import web3config from '../web3config.json'
import nftContracts from '../contracts/nftContracts.json'
import marketPlaceContracts from '../contracts/marketplace.json'
import { NFTCollection, ThirdwebSDK, DirectListing } from '@thirdweb-dev/sdk'
import * as React from 'react'
import ViewListing from '../components/ViewListing'

// This gets called on every request
export async function getStaticProps () {
  console.log('Loading Static Props')
  const targetChain = web3config.targetChain
  const sdk = new ThirdwebSDK(web3config.targetChain)

  // @ts-ignore TODO: resolve this type error
  const nftTreeContract: NFTCollection = sdk.getNFTCollection(nftContracts[targetChain].contracts.NFTREE.address)
  const allNFTrees = await nftTreeContract.getAll()

  // @ts-ignore TODO: resolve this type error
  const marketplaceContract = sdk.getMarketplace(marketPlaceContracts[targetChain].contracts.Marketplace.address)
  console.log('marketplace contract loaded')
  const listings = await marketplaceContract.getActiveListings()

  return { props: { allNFTrees: JSON.stringify(allNFTrees), listings: JSON.stringify(listings) } }
}

/***
 * TODOS:
 * // typing issues with NFTMetaData - _hex and attributes
 * // show nfts in wallet and give list function
 * // buy NFT ability
 * // switch to server props
 */

const Home: NextPage<{allNFTrees: string, listings: string }> = (props) => {
  const listings = JSON.parse(props.listings) as DirectListing[]
  const viewListings = listings.map((listing: DirectListing) => {
    return <ViewListing listing={listing} key={listing.id} />
  })

  return (
    <div id="container" className="font-roboto">
      <div id="hero" className="bg-slate-100 pt-6 px-6 pb-2 flex flex-row justify-between">
        <span id="hero-logo" className="text-5xl font-extrabold text-left text-slate-700 font-josephin font-semibold">ThirdSea</span>
        <div id="nav" className="flex flex-row">
            <button id="wallet" className="bg-slate-700 text-slate-50 text-lg font-medium p-2 rounded-3xl ">Connect Wallet</button>
          </div>
      </div>
      <div>
        {viewListings}
      </div>
    </div>
  )
}

export default Home
