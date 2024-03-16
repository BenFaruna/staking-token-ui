import { useEffect, useState } from "react";
import { getReadOnlyProvider } from "../constants/providers";
import { getMultiCallContract, getStakingPoolContract } from "../constants/contracts";
import { decodeStakingPoolResult, encodeStakingPoolCall } from "../utils/callEncoder";
import { ContractMethodArgs } from "ethers/contract";
import useGetNumberOfPools from "./useGetNumberOfPools";
import useEventListener from "./useEventListener";


const useGetPoolDetails = () => {
    const [poolLoading, setPoolLoading] = useState(true);
    const [poolDetails, setPoolDetails] = useState<Array<Array<string>>>([]);
    const multicallContract = getMultiCallContract(getReadOnlyProvider);
    const stakingPoolContract = getStakingPoolContract(getReadOnlyProvider);
    const totalPools = useGetNumberOfPools();

    const event = useEventListener()

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
                // console.log(response)
                const decodedResponse = response.map((res: any[]) => decodeStakingPoolResult("getPoolByID", res[1]));
                const result: Array<Array<string>> = decodedResponse.map((res: { toString: () => string; }) => res.toString().split(","));

                setPoolDetails(result);
                setPoolLoading(false)
            } else {
                setPoolDetails([]);
            }
        } catch (error) {
            console.error("Error fetching pool details:", error);
            setPoolDetails([]);
        }
    };

    useEffect(() => {
        fetchPoolDetails()
        console.log(poolDetails)
    }, [totalPools, event]);

    return { poolLoading, poolDetails };
};

export default useGetPoolDetails;
