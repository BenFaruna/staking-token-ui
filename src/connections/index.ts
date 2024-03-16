import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = import.meta.env.VITE_projectId

const mumbai = {
    chainId: 80001,
    name: 'Mumbai',
    currency: 'MATIC',
    explorerUrl: 'http://',
    rpcUrl: import.meta.env.VITE_rpc_url
}

// 3. Create modal
const metadata = {
    name: 'Staking SC',
    description: 'My Website description',
    url: 'https://mywebsite.com', // origin must match your domain & subdomain
    icons: ['https://avatars.mywebsite.com/']
}

export const configureWeb3Modal = () => {
    createWeb3Modal({
        ethersConfig: defaultConfig({ metadata }),
        chains: [mumbai],
        projectId,
    })
}