import { Card, Flex, Text, TextField, Button } from "@radix-ui/themes";
import { useState } from "react";
import { formatEther } from "ethers";

import useStakeToken from "../hooks/useStakeToken";
import useUnstakeToken from "../hooks/useUnstakeToken";
import useClaimReward from "../hooks/useClaimReward";


const StakingPoolCard = ({ id, data }: { id: string | number; data: string[] }) => {
    const [amount, setAmount] = useState<string>("");
    const { stake, stakeLoading } = useStakeToken();
    const { unstake, unstakeLoading } = useUnstakeToken();
    const { claimReward, claimRewardLoading } = useClaimReward();

    if (data.length === 0) return;

    return (
        <Card size="2" style={{ maxWidth: 500 }}>
            <TextField.Input
                size="3"
                placeholder="Reward rate..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={stakeLoading}
            />

            <Text as="div" className="my-5">
                Total Stakers: {data[0]}
            </Text>
            <Text as="div">
                Total Staked: {formatEther(data[1])}
            </Text>

            <Text as="div" className="my-5">
                Reward reserve: {formatEther(data[2])}
            </Text>

            <Text as="div" className="my-5">
                Reward Rate: {data[3]}
            </Text>

            <Flex justify={"between"} className="mt-5">
                <Button
                    disabled={stakeLoading || unstakeLoading || claimRewardLoading}
                    onClick={async () => {
                        await stake(id, amount)
                        setAmount("")
                    }}
                >Stake</Button>
                <Button
                    disabled={stakeLoading || unstakeLoading || claimRewardLoading}
                    onClick={async () => {
                        await claimReward(id, amount)
                        setAmount("")
                    }}
                >Claim Rewards</Button>
                <Button
                    disabled={stakeLoading || unstakeLoading || claimRewardLoading}
                    onClick={async () => {
                        await unstake(id, amount)
                        setAmount("")
                    }}
                >Unstake</Button>
            </Flex>
        </Card>
    )
}

export default StakingPoolCard