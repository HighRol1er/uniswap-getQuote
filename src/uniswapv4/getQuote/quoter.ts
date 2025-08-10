import { ethers } from "ethers";
import { QUOTER_CONTRACT_ADDRESS, QUOTER_ABI, RPC_URL } from "./constants";

export const quoterContract = new ethers.Contract(
  QUOTER_CONTRACT_ADDRESS,
  QUOTER_ABI, // Import or define the ABI for Quoter contract
  new ethers.providers.JsonRpcProvider(RPC_URL) // Provide the right RPC address for the chain
);
