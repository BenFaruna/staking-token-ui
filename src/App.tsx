import { Box, Container, Flex, Grid } from "@radix-ui/themes"

import NavBar from "./components/NavBar";
import CreatePool from "./components/CreatePool";

import { configureWeb3Modal } from "./connections";
import StakingPoolCard from "./components/StakingPoolCard";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";


configureWeb3Modal()

function App() {

  const { isConnected } = useWeb3ModalAccount();

  return (
    <Container>
      <NavBar />
      <Box display="block">
        <Flex className="my-2">
          {isConnected && <CreatePool />}
        </Flex>

        <Grid columns="3" gap="3" width="auto">
          <StakingPoolCard id={"0"} />
          <StakingPoolCard id={"1"} />
          <StakingPoolCard id={"2"} />
          {/* <StakingPoolCard id={1} />
          <StakingPoolCard id={1} />
          <StakingPoolCard id={1} />
          <StakingPoolCard id={1} />
          <StakingPoolCard id={1} /> */}
        </Grid>
      </Box>
    </Container>
  )
}

export default App
