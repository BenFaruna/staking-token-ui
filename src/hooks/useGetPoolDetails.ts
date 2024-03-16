import { useEffect, useState } from "react";
import { getReadOnlyProvider } from "../constants/providers";
import { getMultiCallContract, getStakingPoolContract } from "../constants/contracts";
import { decodeStakingPoolResult, encodeStakingPoolCall } from "../utils/callEncoder";
import { ContractMethodArgs } from "ethers/contract";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import useGetNumberOfPools from "./useGetNumberOfPools";

type PoolDetails = {
    isLoading: boolean;
    data: string[][];
};

const useGetPoolDetails = () => {
    const { address } = useWeb3ModalAccount();
    const totalPools = useGetNumberOfPools();
    const [poolDetails, setPoolDetails] = useState<PoolDetails>({ isLoading: true, data: [] });
    const multicallContract = getMultiCallContract(getReadOnlyProvider);
    const stakingPoolContract = getStakingPoolContract(getReadOnlyProvider);

    const fetchPoolDetails = async () => {
        try {
            // Fetch only if totalPools is greater than 0
            if (totalPools > 0) {
                const calls: ContractMethodArgs<any[]> = [];
                for (let i = 0; i < totalPools; i++) {
                    calls.push({
                        target: stakingPoolContract.target,
                        callData: encodeStakingPoolCall("getPoolByID", [i]),
                    });
                }

                const response = await multicallContract.tryAggregate.staticCall(false, calls);
                console.log(response)
                const decodedResponse = response.map((res: any[]) => decodeStakingPoolResult("getPoolByID", res[1]));
                const result: Array<Array<string>> = decodedResponse.map((res) => res.toString().split(","));

                setPoolDetails({ isLoading: false, data: result });
            } else {
                setPoolDetails({ isLoading: false, data: [] });
            }
        } catch (error) {
            console.error("Error fetching pool details:", error);
            setPoolDetails({ isLoading: false, data: [] });
        }
    };

    useEffect(() => {
        fetchPoolDetails()
    }, [totalPools]);

    return poolDetails;
};

export default useGetPoolDetails;
