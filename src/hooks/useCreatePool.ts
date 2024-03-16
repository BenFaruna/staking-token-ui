import { useWeb3ModalProvider } from "@web3modal/ethers/react"
import { getRewardTokenContract, getStakingPoolContract } from "../constants/contracts";
import { getReadWriteProvider } from "../constants/providers";
import { toast, Id } from "react-toastify";
import { ethers } from "ethers";


const useCreatePool = () => {
  const { walletProvider } = useWeb3ModalProvider();
  const provider = getReadWriteProvider(walletProvider);


  const createPool = async (rewardRate: string | undefined) => {
    const signer = await provider.getSigner()

    const stakingPoolContract = getStakingPoolContract(signer);
    const rewardTokenContract = getRewardTokenContract(signer);

    let toastId: Id = toast.loading("Creating staking pool");

    try {
      const reward = ethers.parseEther("100")

      const approveTx = await rewardTokenContract.approve(
        import.meta.env.VITE_staking_pool_address,
        reward
      );
      await approveTx.wait();

      const createPoolTx = await stakingPoolContract.createPool(rewardRate);
      await createPoolTx.wait()

      console.log(createPoolTx)
      toast.success("Staking pool created")

    } catch (error) {
      console.error(error)
      toast.error("Failed to create pool")
    } finally {
      toast.dismiss(toastId);
    }
  }

  return createPool
}

export default useCreatePool