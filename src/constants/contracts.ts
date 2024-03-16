import { ethers } from "ethers";
import StakingPoolAbi from "./stakingPoolAbi.json";
import TokenAbi from "./tokenAbi.json";

export const getStakingPoolContract = (providerOrSigner: ethers.ContractRunner) => {
    return new ethers.Contract(
        import.meta.env.VITE_staking_pool_address,
        StakingPoolAbi,
        providerOrSigner
    )
}

export const getStakeTokenContract = (providerOrSigner: ethers.ContractRunner) => {
    return new ethers.Contract(
        import.meta.env.VITE_stake_contract_address,
        TokenAbi,
        providerOrSigner
    )
}

export const getRewardTokenContract = (providerOrSigner: ethers.ContractRunner) => {
    return new ethers.Contract(
        import.meta.env.VITE_reward_contract_address,
        TokenAbi,
        providerOrSigner
    )
}