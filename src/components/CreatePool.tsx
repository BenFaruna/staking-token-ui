import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes"
import { useState } from "react";
import { toast } from "react-toastify";

import useCreatePool from "../hooks/useCreatePool"


const CreatePool = () => {
    const [rewardRate, setRewardRate] = useState<string>("")
    const createPool = useCreatePool();

    return (
        <Dialog.Root>
            <Dialog.Trigger className="float-left">
                <Button className="block">Create Staking Pool</Button>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>Create Staking Pool</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Specify a reward rate
                </Dialog.Description>

                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Reward Rate
                        </Text>
                        <TextField.Input
                            placeholder="Enter reward rate"
                            onChange={(e) => setRewardRate(e.target.value)}
                        />
                    </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button
                            onClick={async () => {
                                if (rewardRate === "") return toast.error("Require reward rate to stake")
                                if (isNaN(Number(rewardRate))) return toast.error("Require number for reward rate")
                                await createPool(rewardRate)
                                setRewardRate("")
                            }}
                        >Create Pool</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}

export default CreatePool