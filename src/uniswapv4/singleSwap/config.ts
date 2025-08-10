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
  amountIn: ethers.utils.parseUnits("0.0001", ETH_TOKEN.decimals).toString(), // 0.01 ETH로 테스트
  // amountOutMinimum: "minAmountOut", // Change according to the slippage desired
  amountOutMinimum: "0", // Change according to the slippage desired
  hookData: "0x00",
};
