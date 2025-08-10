import { ethers } from "ethers";
import { CurrentConfig } from "../config";
import { USDC_TOKEN } from "../constants";
import { quoterContract } from "../quoter";

export async function getQuote() {
  const params = {
    poolKey: CurrentConfig.poolKey,
    zeroForOne: CurrentConfig.zeroForOne,
    exactAmount: CurrentConfig.amountIn,
    hookData: CurrentConfig.hookData,
  };

  const quotedAmountOut = await quoterContract.quoteExactInputSingle.staticCall(
    params
  );

  console.log(
    ethers.utils.formatUnits(quotedAmountOut[0], USDC_TOKEN.decimals)
  ); // [amountOut, gasEstimate]
  return quotedAmountOut[0];
}
