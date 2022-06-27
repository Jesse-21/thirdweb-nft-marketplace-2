import type { NextPage } from 'next'
import web3config from '../web3config.json'
import nftContracts from '../contracts/nftContracts.json'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import * as React from 'react'
import { NFTData } from '../types/NFTData'
import ViewNFT from '../components/ViewNFT'

// This gets called on every request
export async function getStaticProps () {
  const targetChain = web3config.targetChain
  const sdk = new ThirdwebSDK(web3config.targetChain)
  const contract = sdk.getNFTCollection(nftContracts[targetChain].contracts.NFTREE.address)
  const allNfts = await contract.getAll()
  // Pass data to the page via props
  return { props: { allNfts: JSON.stringify(allNfts) } }
}

const Home: NextPage<{allNfts: string}> = (props) => {
  const allNfts = JSON.parse(props.allNfts) as NFTData[]
  const nfts = allNfts.map((nft: NFTData) => {
    return <ViewNFT nft={nft} key={nft.metadata.id.hex} />
  })

  return (
    <div className="m-2 text-center">
      <div className="text-3xl text-center" >
        🌳 NFTree Collection 🌳
      </div>
      {nfts}
    </div>
  )
}

export default Home
