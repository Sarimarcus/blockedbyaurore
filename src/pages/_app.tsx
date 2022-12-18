import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit'
import { argentWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets'
import { ChainId, ThirdwebSDKProvider } from '@thirdweb-dev/react'
import { Analytics } from '@vercel/analytics/react'
import { polygon, polygonMumbai } from '@wagmi/core/chains'
import { AppProps } from 'next/app'
import { createClient, configureChains, WagmiConfig, useSigner } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

import '../styles/global.css'
import '@rainbow-me/rainbowkit/styles.css'

const { chains, provider, webSocketProvider } = configureChains(
  [polygonMumbai, polygon],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: process.env.NEXT_PUBLIC_CUSTOM_RPC_HTTP,
        webSocket: process.env.NEXT_PUBLIC_CUSTOM_RPC_WSS,
      }),
    }),
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_APY_KEY }),
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_APY_KEY }),
  ]
)

const { wallets } = getDefaultWallets({
  appName: 'RainbowKit Mint NFT Demo',
  chains,
})

const demoAppInfo = {
  appName: 'RainbowKit Mint NFT Demo',
}

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [argentWallet({ chains }), trustWallet({ chains })],
  },
])

/* eslint-disable @typescript-eslint/no-shadow */
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

function ThirdwebProvider({ wagmiClient, children }: any) {
  const { data: signer } = useSigner()

  return (
    <ThirdwebSDKProvider
      desiredChainId={ChainId.Mumbai}
      signer={signer as any}
      provider={wagmiClient.provider}
      queryClient={wagmiClient.queryClient as any}
    >
      {children}
    </ThirdwebSDKProvider>
  )
}

const MyApp = ({ Component, pageProps }: AppProps) => (
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
      <ThirdwebProvider wagmiClient={wagmiClient}>
        <Component {...pageProps} />
        <Analytics />
      </ThirdwebProvider>
    </RainbowKitProvider>
  </WagmiConfig>
)

export default MyApp
