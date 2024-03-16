import { Container, Flex } from "@radix-ui/themes"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from "./components/NavBar";

import { configureWeb3Modal } from "./connections";
// import { useWeb3ModalAccount } from "@web3modal/ethers/react";


configureWeb3Modal()

function App() {

  // const { isConnected } = useWeb3ModalAccount();

  return (
    <Container>
      <NavBar />
      <ToastContainer theme="dark" />
    </Container>
  )
}

export default App
