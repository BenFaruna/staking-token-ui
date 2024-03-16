import { useEffect, useState } from "react"
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { formatEther } from "ethers";
import { getReadOnlyProvider } from "../constants/providers";
import { getTokenContract } from "../constants/contracts";
import useGetLatestBlock from "../hooks/useGetLatestBlock";

const TotalRewards = () => {
    const [reward, setReward] = useState<string>("");
    const blockNumber = useGetLatestBlock();

    useEffect(() => {
        const tokenContract = getTokenContract(getReadOnlyProvider);

        tokenContract.balanceOf(
            import.meta.env.VITE_staking_contract
        )
            .then((res) => {
                setReward(
                    parseFloat(formatEther(res.toString()))
                        .toFixed(2)
                )
            })
            .catch((err) => { console.error("Error:", err) });
    }, [blockNumber])

    return (
        <Card style={{ maxWidth: 240 }}>
            <Flex gap="3" align="center">
                <Box>
                    <Text as="div" size="6" weight="bold">
                        Total Rewards
                    </Text>
                    <Text as="div" size="6" color="gray">
                        {reward}
                    </Text>
                </Box>
            </Flex>
        </Card>
    )
}

export default TotalRewards