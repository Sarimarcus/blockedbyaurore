import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { abi } from '../../contract-abi'

import FlipCard, { BackCard, FrontCard } from '../flipcard/FlipCard'
import { Section } from '../layout/Section'

const contractConfig = {
  address: process.env.NEXT_PUBLIC_SMARTCONTRACT_ADDRESS,
  abi,
}

const Mint = () => {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const { address, isConnected } = useAccount()
  const [totalMinted, setTotalMinted] = React.useState(0)

  const { config: contractWriteConfig } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'claim',
    args: [
      address,
      1,
      '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      0,
      {
        proof: [
          '0x0000000000000000000000000000000000000000000000000000000000000000',
        ],
        quantityLimitPerWallet: 0,
        pricePerToken: 0,
        currency: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      },
      '0x00',
    ],
  })

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite(contractWriteConfig)

  const { data: totalSupplyData } = useContractRead({
    ...contractConfig,
    functionName: 'totalMinted',
    watch: true,
  })

  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransaction({
    hash: mintData?.hash,
  })

  React.useEffect(() => {
    if (totalSupplyData) {
      setTotalMinted(totalSupplyData.toNumber())
    }
  }, [totalSupplyData])

  const isMinted = txSuccess

  return (
    <>
      <Section title="It's free">
        <h3 className="text-3xl text-gray-900 font-semibold text-center">
          {totalMinted} minted so far!
        </h3>
        <div className="mt-20 flex flex-wrap">
          <div className="w-full sm:w-1/2 sm:px-6">
            <ConnectButton showBalance={false} />

            {mintError && (
              <p className="text-lg text-red-600">Error: {mintError.message}</p>
            )}
            {txError && (
              <p className="text-lg text-red-600">Error: {txError.message}</p>
            )}

            {mounted && isConnected && !isMinted && (
              <button
                disabled={!mint || isMintLoading || isMintStarted}
                className="text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase px-8 py-3 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 my-8 cursor-pointer"
                data-mint-loading={isMintLoading}
                data-mint-started={isMintStarted}
                onClick={() => mint?.()}
              >
                {isMintLoading && 'Waiting for approval'}
                {isMintStarted && 'Minting...'}
                {!isMintLoading && !isMintStarted && 'Mint'}
              </button>
            )}
          </div>

          <div className="w-full sm:w-1/2">
            <FlipCard>
              <FrontCard isCardFlipped={isMinted}>
                <img
                  src="/nft.png"
                  width="500"
                  height="500"
                  alt="RainbowKit Demo NFT"
                />
              </FrontCard>
              <BackCard isCardFlipped={isMinted}>
                <div style={{ padding: 24 }}>
                  <img
                    src="/nft.png"
                    width="80"
                    height="80"
                    alt="RainbowKit Demo NFT"
                    style={{ borderRadius: 8 }}
                  />
                  <h2 style={{ marginTop: 24, marginBottom: 6 }}>
                    NFT Minted!
                  </h2>
                  <p style={{ marginBottom: 24 }}>
                    Your NFT will show up in your wallet in the next few
                    minutes.
                  </p>
                  <p style={{ marginBottom: 6 }}>
                    View on{' '}
                    <a href={`https://polygonscan.com/tx/${mintData?.hash}`}>
                      Etherscan
                    </a>
                  </p>
                  <p>
                    View on{' '}
                    <a href={`https://opensea.io/${txData?.to}/1`}>Opensea</a>
                  </p>
                </div>
              </BackCard>
            </FlipCard>
          </div>
        </div>
      </Section>
    </>
  )
}

export { Mint }
