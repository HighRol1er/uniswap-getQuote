"use client";
// import { getQuote } from "@/uniswapv4/getQuote/action/getQuote";

// export default async function Home() {
//   const quote = await getQuote();
//   return <div>{quote}</div>;
// }

// src/app/swap/page.tsx
import { executeSwap } from "@/uniswapv4/singleSwap/action";

export default function SwapPage() {
  const handleSwap = async () => {
    try {
      const receipt = await executeSwap();
      console.log("스왑 완료:", receipt.transactionHash);
    } catch (error) {
      console.error("스왑 실패:", error);
    }
  };

  return (
    <div>
      <button onClick={handleSwap}>1 ETH → USDC 스왑 실행</button>
    </div>
  );
}
