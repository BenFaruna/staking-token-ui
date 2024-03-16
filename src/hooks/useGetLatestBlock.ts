import { useEffect, useState } from "react";
import { getWssProvider } from "../constants/providers";
import { getTokenContract } from "../constants/contracts";


const useGetLatestBlock = () => {
    const [blockNumber, setBlockNumber] = useState<Number | undefined>(undefined);

    const eventListener = async () => {
        getWssProvider.on("block", (blockNumber) => {
            setBlockNumber(blockNumber);
        });
    }

    useEffect(() => {
        eventListener();
        // getWssProvider.getLogs() for previous events

        // console.log("new block", blockNumber);
        return () => {
            getTokenContract(getWssProvider).removeAllListeners("block");
            console.log("event disconnected");
        }
    }, []);

    return blockNumber;
    // ethers.AbiCoder.defaultAbiCoder().decode()
}

export default useGetLatestBlock