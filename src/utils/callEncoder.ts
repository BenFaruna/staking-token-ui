import { ethers } from "ethers";

import TokenAbi from "../constants/tokenAbi.json";
import StakingPoolAbi from "../constants/stakingPoolAbi.json";

const getTokenInterface = () => new ethers.Interface(TokenAbi);

export const getStakingPoolInterface = () => new ethers.Interface(StakingPoolAbi);

export const encodeStakingPoolCall = (fn: string, values: any[]) => {
    const itf = getStakingPoolInterface()
    const data = itf.encodeFunctionData(fn, values)

    return data
}

export const decodeStakingPoolResult = (fn: string, data: any) => {
    const itf = getStakingPoolInterface()
    const result = itf.decodeFunctionResult(fn, data)

    return result
}