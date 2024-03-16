import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { getReadOnlyProvider } from "../constants/providers";
import { getStakeTokenContract, getRewardTokenContract } from "../constants/contracts";


const useGetUserTokenBalance = (newBlock: Number | undefined) => {
    const [stakeBalance, setStakeBalance] = useState<string>("0")
    const [rewardBalance, setRewardBalance] = useState<string>("0")
    const { address } = useWeb3ModalAccount()

    useEffect(() => {
        if (typeof address === "undefined") {
            setStakeBalance("0")
            setRewardBalance("0")
            return
        }

        const contract = getStakeTokenContract(getReadOnlyProvider)
        contract.balanceOf(address)
            .then((res) => {
                setStakeBalance(ethers.formatUnits(res, 18))
            })
            .catch((err) => {
                toast("Could not fetch balance", { type: "error" })
                console.error("Error:", err)
            })
    }, [address, newBlock])

    const contract = getRewardTokenContract(getReadOnlyProvider)
    contract.balanceOf(address)
        .then((res) => {
            setRewardBalance(ethers.formatUnits(res, 18))
        })
        .catch((err) => {
            toast("Could not fetch balance", { type: "error" })
            console.error("Error:", err)
        })
    return { stakeBalance, rewardBalance }
}

export default useGetUserTokenBalance;
