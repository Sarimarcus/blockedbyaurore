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
      <Section title="It's free, only 1000 supply">
        {mounted && isConnected && (
          <h3 className="text-3xl text-gray-900 font-semibold text-center m-8">
            {totalMinted} minted so far!
          </h3>
        )}
        <div className="mt-20 flex flex-wrap justify-center">
          <div className="m-8">
            <ConnectButton />

            {mintError && (
              <p className="text-lg text-red-600">Error: {mintError.message}</p>
            )}
            {txError && (
              <p className="text-lg text-red-600">Error: {txError.message}</p>
            )}

            <div className="my-8 text-center">
              {mounted && isConnected && !isMinted && (
                <button
                  disabled={!mint || isMintLoading || isMintStarted}
                  className="jsx-2452873545 btn btn-base btn-primary cursor-pointer"
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
          </div>

          <div className="m-8">
            <FlipCard>
              <FrontCard isCardFlipped={isMinted}>
                <img src="/nft.png" width="500" height="500" alt="NFT" />
                <h1 style={{ marginTop: 24 }}>Rainbow NFT</h1>
                <ConnectButton />
              </FrontCard>
              <BackCard isCardFlipped={isMinted}>
                <div style={{ padding: 24 }}>
                  <img
                    src="/nft.png"
                    width="80"
                    height="80"
                    alt="NFT"
                    style={{ borderRadius: 8 }}
                  />
                  <h2 className="text-2xl font-bold py-3">NFT Minted!</h2>
                  <p style={{ marginBottom: 24 }}>
                    Your NFT will show up in your wallet in the next few
                    minutes.
                  </p>
                  <p style={{ marginBottom: 6 }}>
                    View on{' '}
                    <a
                      href={`https://polygonscan.com/tx/${mintData?.hash}`}
                      className="underline"
                    >
                      Etherscan
                    </a>
                  </p>
                  <p>
                    View on{' '}
                    <a
                      href={`https://opensea.io/${txData?.to}/1`}
                      className="underline"
                    >
                      Opensea
                    </a>
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
