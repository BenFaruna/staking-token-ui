import { ethers } from "ethers";

export const getReadOnlyProvider = new ethers.JsonRpcProvider(
    import.meta.env.VITE_rpc_url
);

export const getReadWriteProvider = (
    provider: ethers.Eip1193Provider | any) => new ethers.BrowserProvider(provider);

export const getWssProvider = new ethers.WebSocketProvider(
    import.meta.env.VITE_wss_url
);