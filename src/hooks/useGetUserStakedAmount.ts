import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

import { getReadOnlyProvider } from "../constants/providers";
import { getStakingContract } from "../constants/contracts";



const useGetUserStakedAmount = (newBlock: Number | undefined) => {
    const [stakedAmount, setStakedAmount] = useState<string>("0")
    const { address } = useWeb3ModalAccount();
    // const newBlock = useGetLatestBlock();

    useEffect(() => {

        if (address) {
            const stakingContract = getStakingContract(getReadOnlyProvider);
            stakingContract.stakedAmount(address)
                .then((stakedAmount) => {
                    setStakedAmount(ethers.formatUnits(stakedAmount, 18));
                });
        } else {
            setStakedAmount("0");
        }
    }, [address, newBlock]);

    return stakedAmount;
}

export default useGetUserStakedAmount