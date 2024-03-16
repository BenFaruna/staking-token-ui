import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

import { getStakingPoolContract } from "../constants/contracts";
import { getReadWriteProvider } from "../constants/providers";


const useUnstakeToken = () => {
    const { walletProvider } = useWeb3ModalProvider();
    const [unstakeLoading, setLoading] = useState<boolean>(false);

    const unstake = useCallback(async (id: number | string, amount: string) => {
        if (amount !== "") return toast.error("Amount is not required");
        setLoading(true);

        try {
            const provider = getReadWriteProvider(walletProvider);

            const signer = await provider.getSigner();
            const stakingContract = getStakingPoolContract(signer);

            // unstake the token
            const unstakeTx = await stakingContract.unstake(id);
            const receipt = await unstakeTx.wait();
            toast.success("Unstaked successfully");

            console.log(receipt);
        } catch (err) {
            toast.error("Could not unstake");
            console.error(err);
        } finally {
            setLoading(false);
        }
    },
        [walletProvider]);

    return { unstake, unstakeLoading }
}

export default useUnstakeToken