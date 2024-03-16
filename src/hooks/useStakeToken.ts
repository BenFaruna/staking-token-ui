import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { parseEther } from "ethers";
import { useCallback, useState } from "react"
import { toast } from "react-toastify";


import { getStakingContract, getTokenContract } from "../constants/contracts";
import { getReadWriteProvider } from "../constants/providers";


const useStakeToken = () => {
    const { walletProvider } = useWeb3ModalProvider();
    const [stakeLoading, setLoading] = useState<boolean>(false);


    const stake = useCallback(async (amount: string) => {
        if (amount === "") return console.error("Amount is required");
        setLoading(true);

        try {
            const provider = getReadWriteProvider(walletProvider);

            const signer = await provider.getSigner();
            const tokenContract = getTokenContract(signer);
            const stakingContract = getStakingContract(signer);
            const parsedAmount = parseEther(amount).toString();

            // approve staking contract to spend the token
            const approveTx = await tokenContract.approve(stakingContract.target, parsedAmount);
            await approveTx.wait();
            // Call the stake function from the smart contract
            const stakeTx = await stakingContract.stake(parsedAmount);
            const receipt = await stakeTx.wait();
            toast("Staked successfully", { type: "success" });

            console.log(receipt);
        } catch (err) {
            toast.error("Could not stake", { type: "error" });
            console.error(err);
        } finally {
            setLoading(false);
        }
    },
        [walletProvider]);

    return { stake, stakeLoading }
}

export default useStakeToken;