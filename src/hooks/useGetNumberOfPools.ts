import { useEffect, useState } from "react";
import { getReadOnlyProvider } from "../constants/providers";
import { getStakingPoolContract } from "../constants/contracts";

const useGetNumberOfPools = () => {
    const [totalPools, setTotalPools] = useState<number>(0);
    const stakingPoolContract = getStakingPoolContract(getReadOnlyProvider);

    useEffect(() => {
        const fetchTotalPools = async () => {
            try {
                const data = await stakingPoolContract.id();
                setTotalPools(Number(data));
            } catch (error) {
                console.error("Error fetching total pools:", error);
            }
        };

        fetchTotalPools();

    }, []);

    return totalPools;
};

export default useGetNumberOfPools