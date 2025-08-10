import { ethers } from "ethers";
import { RPC_URL } from "./constants";

const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const signer = new ethers.Wallet(
  process.env.NEXT_PUBLIC_PRIVATE_KEY!,
  provider
);

export { signer };
