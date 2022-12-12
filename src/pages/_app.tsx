import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit'
import { argentWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets'
import { ChainId, ThirdwebSDKProvider } from '@thirdweb-dev/react'
import { polygon, polygonMumbai } from '@wagmi/core/chains'
import { AppProps } from 'next/app'
import {
  createClient,
  configureChains,
  WagmiConfig,
  Chain,
  useSigner,
} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import '../styles/global.css'
import '@rainbow-me/rainbowkit/styles.css'

const rinkeby: Chain = {
  id: 4,
  name: 'Rinkeby',
  network: 'rinkeby',
  nativeCurrency: { name: 'Rinkeby Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    alchemy: 'https://eth-rinkeby.alchemyapi.io/v2',
    default: 'https://rpc.ankr.com/eth_rinkeby',
    infura: 'https://rinkeby.infura.io/v3',
    public: 'https://rpc.ankr.com/eth_rinkeby',
  },
  blockExplorers: {
    etherscan: { name: 'Etherscan', url: 'https://rinkeby.etherscan.io' },
    default: { name: 'Etherscan', url: 'https://rinkeby.etherscan.io' },
  },
  ens: {
    address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  },
  multicall: {
    address: '0xca11bde05977b3631167028862be2a173976ca11',
    blockCreated: 10299530,
  },
  testnet: true,
}

const { chains, provider, webSocketProvider } = configureChains(
  [polygonMumbai, polygon, rinkeby],
  [publicProvider()]
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
      </ThirdwebProvider>
    </RainbowKitProvider>
  </WagmiConfig>
)

export default MyApp
