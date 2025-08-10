import { SwapExactInSingle } from "@uniswap/v4-sdk";
import { USDC_TOKEN, ETH_TOKEN } from "./constants";
import { ethers } from "ethers";

export const CurrentConfig: SwapExactInSingle = {
  poolKey: {
    currency0: ETH_TOKEN.address,
    currency1: USDC_TOKEN.address,
    fee: 500,
    tickSpacing: 10,
    hooks: "0x0000000000000000000000000000000000000000",
  },
  zeroForOne: true,
  amountIn: ethers.utils.parseUnits("1", ETH_TOKEN.decimals).toString(),
  amountOutMinimum: "0",
  hookData: "0x00",
};

/**
 * zeroForOne: true   // currency0 → currency1 (ETH → USDC)
 * zeroForOne: false  // currency1 → currency0 (USDC → ETH)
 *
 */
