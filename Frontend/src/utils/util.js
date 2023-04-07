import { ethers } from "ethers";
import { CAR_REGISTRATION_ABI, SMART_CONTRACT_ADDRESS } from "./constants";

export const connectRegistrationContract = async () => {
  try {
    const [address] = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      SMART_CONTRACT_ADDRESS,
      CAR_REGISTRATION_ABI,
      signer
    );
    return { contract, address };
  } catch (ex) {
    console.log(ex.message);
    throw Error(ex);
  }
};
