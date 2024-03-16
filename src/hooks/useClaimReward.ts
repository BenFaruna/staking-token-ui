import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { useCallback, useState } from "react";
import { Id, toast } from "react-toastify";

import { getStakingPoolContract } from "../constants/contracts";
import { getReadWriteProvider } from "../constants/providers";


const useClaimReward = () => {
    const { walletProvider } = useWeb3ModalProvider();
    const [claimRewardLoading, setLoading] = useState<boolean>(false);

    let toastId: Id;

    const claimReward = useCallback(async (id: number | string, amount: string) => {
        if (amount !== "") return toast.error("Amount is not required");
        setLoading(true);

        try {
            toastId = toast.loading("Claiming reward...");
            const provider = getReadWriteProvider(walletProvider);

            const signer = await provider.getSigner();
            const stakingContract = getStakingPoolContract(signer);

            // unstake the token
            const claimTx = await stakingContract.claimReward(id);
            const receipt = await claimTx.wait();
            toast.success("Reward claimed successfully");

            console.log(receipt);
        } catch (err) {
            toast.error("Could not unstake");
            console.dir(err)
        } finally {
            toast.dismiss(toastId)
            setLoading(false);
        }
    },
        [walletProvider]);

    return { claimReward, claimRewardLoading }
}

export default useClaimReward