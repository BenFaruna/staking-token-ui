import { Box, Container, Flex, Grid } from "@radix-ui/themes"

import NavBar from "./components/NavBar";
import CreatePool from "./components/CreatePool";

import { configureWeb3Modal } from "./connections";
import StakingPoolCard from "./components/StakingPoolCard";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import useGetPoolDetails from "./hooks/useGetPoolDetails";


configureWeb3Modal()

function App() {

  const { isConnected } = useWeb3ModalAccount();
  const { isLoading, data: poolDetails } = useGetPoolDetails();

  console.log(isLoading, poolDetails)

  return (
    <Container>
      <NavBar />
      <Box display="block">
        <Flex className="my-2">
          {isConnected && <CreatePool />}
        </Flex>

        <Grid columns="4" gap="3" width="auto">
          <StakingPoolCard />
          <StakingPoolCard />
          <StakingPoolCard />
          <StakingPoolCard />
          <StakingPoolCard />
          <StakingPoolCard />
          <StakingPoolCard />
          <StakingPoolCard />
        </Grid>
      </Box>
    </Container>
  )
}

export default App
