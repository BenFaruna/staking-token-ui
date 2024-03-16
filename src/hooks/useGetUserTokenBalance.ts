import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { getReadOnlyProvider } from "../constants/providers";
import { getTokenContract } from "../constants/contracts";
// import useGetLatestBlock from "./useGetLatestBlock";

const useGetUserTokenBalance = (newBlock: Number | undefined) => {
    const [balance, setBalance] = useState<string>("0")
    const { address } = useWeb3ModalAccount()
    // const newBlock = useGetLatestBlock()

    useEffect(() => {
        if (typeof address === "undefined") {
            setBalance("0")
            return
        }

        const contract = getTokenContract(getReadOnlyProvider)
        contract.balanceOf(address)
            .then((res) => {
                setBalance(ethers.formatUnits(res, 18))
            })
            .catch((err) => {
                toast("Could not fetch balance", { type: "error" })
                console.error("Error:", err)
            })
    }, [address, newBlock])

    return balance
}

export default useGetUserTokenBalance;
