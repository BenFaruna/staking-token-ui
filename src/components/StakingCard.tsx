import { Card, Flex, Text, TextField, Button } from "@radix-ui/themes";
import { useState } from "react";

import useGetUserTokenBalance from "../hooks/useGetUserTokenBalance";
import useGetUserStakedAmount from "../hooks/useGetUserStakedAmount";
import useGetTotalRewards from "../hooks/useGetTotalRewards";
import useStakeToken from "../hooks/useStakeToken";
import useUnstakeToken from "../hooks/useUnstakeToken";

import { accrualPercentage, rewardsCalculation } from "../utils/rewardsCalculation";
import useGetLatestBlock from "../hooks/useGetLatestBlock";


const StakingCard = () => {
    const newBlock = useGetLatestBlock();
    const balance = useGetUserTokenBalance(newBlock);
    const stakedBalance = useGetUserStakedAmount(newBlock);
    const totalRewards = useGetTotalRewards(newBlock);
    const [amount, setAmount] = useState<string>("");
    const { stake, stakeLoading } = useStakeToken();
    const { unstake, unstakeLoading } = useUnstakeToken();

    return (
        <Card size="2" style={{ maxWidth: 500 }}>
            <TextField.Input
                size="3"
                placeholder="Amount to stake..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={stakeLoading}
            />

            <Text as="div" className="my-5">
                User Balance: {balance}
            </Text>

            <Text as="div" className="my-5">
                Total Staked: {stakedBalance}
            </Text>
            <Text as="div">
                Rewards accrual %:
                <span className="text-green-500 ml-1">
                    {accrualPercentage(stakedBalance, totalRewards)}%
                </span>
            </Text>

            <Text as="div" className="my-5">
                Total Rewards: {stakedBalance !== "0" ? rewardsCalculation(stakedBalance, totalRewards) : "0"}
            </Text>

            <Text as="div" className="my-5">
                Withdrawable: {stakedBalance !== "0" ? totalRewards : "0"}
            </Text>

            <Flex justify={"between"} className="mt-5">
                <Button
                    disabled={stakeLoading || unstakeLoading}
                    onClick={async () => {
                        await stake(amount)
                        setAmount("")
                    }}>Stake</Button>
                <Button
                    disabled={stakeLoading || unstakeLoading}
                    onClick={async () => {
                        await unstake(amount)
                        setAmount("")
                    }}>Unstake</Button>
            </Flex>
        </Card>
    )
}

export default StakingCard