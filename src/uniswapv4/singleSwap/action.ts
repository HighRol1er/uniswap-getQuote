import { Actions, V4Planner } from "@uniswap/v4-sdk";
import { CommandType, RoutePlanner } from "@uniswap/universal-router-sdk";
import { CurrentConfig } from "./config";
import { universalRouter } from "./router";

export async function executeSwap() {
  const v4Planner = new V4Planner();
  const routePlanner = new RoutePlanner();

  // Set deadline (1 hour from now)
  const deadline = Math.floor(Date.now() / 1000) + 3600;

  v4Planner.addAction(Actions.SWAP_EXACT_IN_SINGLE, [CurrentConfig]);
  v4Planner.addAction(Actions.SETTLE_ALL, [
    CurrentConfig.poolKey.currency0,
    CurrentConfig.amountIn,
  ]);
  v4Planner.addAction(Actions.TAKE_ALL, [
    CurrentConfig.poolKey.currency1,
    CurrentConfig.amountOutMinimum,
  ]);

  const encodedActions = v4Planner.finalize();

  routePlanner.addCommand(CommandType.V4_SWAP, [
    v4Planner.actions,
    v4Planner.params,
  ]);

  // Only needed for native ETH as input currency swaps
  const txOptions: any = {
    value: CurrentConfig.amountIn,
  };

  try {
    const tx = await universalRouter.execute(
      routePlanner.commands,
      [encodedActions],
      deadline,
      txOptions
    );

    console.log("Transaction sent:", tx.hash);
    const receipt = await tx.wait();
    console.log("Swap completed! Transaction hash:", receipt.transactionHash);

    return receipt;
  } catch (error) {
    console.error("Swap failed:", error);
    throw error;
  }
}
