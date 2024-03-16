import { useEffect, useState } from "react"
import { getReadOnlyProvider } from "../constants/providers";
import { getStakingContract } from "../constants/contracts";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { formatUnits } from "ethers";
// import useGetLatestBlock from "./useGetLatestBlock";


const useGetTotalRewards = (newBlock: Number | undefined) => {
    const [totalRewards, setTotalRewards] = useState<string>("0");
    const { address } = useWeb3ModalAccount();
    // const newBlock = useGetLatestBlock();

    useEffect(() => {
        const stakingContract = getStakingContract(getReadOnlyProvider);
        stakingContract.getTotalRewards(address)
            .then((totalRewards) => {
                const rewards = formatUnits(totalRewards, 18);
                setTotalRewards(rewards);
            });
    }, [address, newBlock])
    return totalRewards;
}

export default useGetTotalRewards