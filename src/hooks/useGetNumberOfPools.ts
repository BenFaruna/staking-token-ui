import { useState } from "react";
import { getReadOnlyProvider } from "../constants/providers";
import { getStakingPoolContract } from "../constants/contracts";

const useGetNumberOfPools = () => {
    const [totalPools, setTotalPools] = useState<number>(0);
    const stakingPoolContract = getStakingPoolContract(getReadOnlyProvider);

    (async () => {
        const ids = await stakingPoolContract.id();
        setTotalPools(Number(ids));
    })();

    // console.log("pools", totalPools);


    return totalPools;
}

export default useGetNumberOfPools