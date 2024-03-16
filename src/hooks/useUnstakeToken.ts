import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { parseEther } from "ethers";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

import { getStakingContract } from "../constants/contracts";
import { getReadWriteProvider } from "../constants/providers";


const useUnstakeToken = () => {
    const { walletProvider } = useWeb3ModalProvider();
    const [unstakeLoading, setLoading] = useState<boolean>(false);

    const unstake = useCallback(async (amount: string) => {
        if (amount === "") return console.error("Amount is required");
        setLoading(true);

        try {
            const provider = getReadWriteProvider(walletProvider);

            const signer = await provider.getSigner();
            const stakingContract = getStakingContract(signer);
            const parsedAmount = parseEther(amount).toString();

            // unstake the token
            const unstakeTx = await stakingContract.unstake(parsedAmount);
            const receipt = await unstakeTx.wait();
            toast("Unstaked successfully", { type: "success" });

            console.log(receipt);
        } catch (err) {
            toast.error("Could not unstake", { type: "error" });
            console.error(err);
        } finally {
            setLoading(false);
        }
    },
        [walletProvider]);

    return { unstake, unstakeLoading }
}

export default useUnstakeToken