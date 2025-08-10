// "use client";

// import { useState } from "react";
// import {
//   getQuoteWithCurrentConfig,
//   quoteExactInputSingle,
//   displayQuote,
// } from "../uniswapv4/quoter";
// import { CurrentConfig } from "../uniswapv4/config";
// import { ETH_TOKEN, USDC_TOKEN } from "../uniswapv4/constants";
// import { ethers } from "ethers";

// export default function Home() {
//   const [quote, setQuote] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>("");
//   const [rpcUrl, setRpcUrl] = useState<string>(
//     // "https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY"
//     "https://eth-mainnet.g.alchemy.com/v2/ndGHAbHGHFB4dlrbo2vtQPSjapZukQVz"
//   );

//   const handleGetQuote = async () => {
//     setLoading(true);
//     setError("");
//     setQuote("");

//     try {
//       // 실제 RPC URL로 견적 받기
//       const result = await getQuoteWithCurrentConfig(rpcUrl);
//       setQuote(result);
//     } catch (err) {
//       console.error("Error getting quote:", err);
//       setError("견적을 받아오는데 실패했습니다. RPC URL을 확인해주세요.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCustomQuote = async () => {
//     setLoading(true);
//     setError("");
//     setQuote("");

//     try {
//       // 사용자 정의 금액으로 견적 받기 (0.5 ETH)
//       const customAmount = ethers
//         .parseUnits("0.5", ETH_TOKEN.decimals)
//         .toString();

//       const result = await quoteExactInputSingle(
//         CurrentConfig.poolKey,
//         CurrentConfig.zeroForOne,
//         customAmount,
//         CurrentConfig.hookData,
//         rpcUrl
//       );

//       const formattedResult = ethers.formatUnits(result, USDC_TOKEN.decimals);
//       setQuote(formattedResult);

//       // 콘솔에 결과 표시
//       displayQuote("0.5", "ETH", formattedResult, "USDC");
//     } catch (err) {
//       console.error("Error getting custom quote:", err);
//       setError("커스텀 견적을 받아오는데 실패했습니다.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 text-black">
//       <div className="max-w-4xl mx-auto px-4">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h1 className="text-3xl font-bold text-black mb-6">
//             Uniswap V4 Quoter Demo
//           </h1>

//           {/* RPC URL 설정 */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-black mb-2">
//               RPC URL 설정
//             </label>
//             <input
//               type="text"
//               value={rpcUrl}
//               onChange={(e) => setRpcUrl(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY"
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               실제 Ethereum 노드 또는 Alchemy/Infura API URL을 입력하세요
//             </p>
//           </div>

//           {/* 현재 설정 정보 */}
//           <div className="bg-gray-100 rounded-lg p-4 mb-6">
//             <h2 className="text-lg font-semibold mb-3">현재 스왑 설정</h2>
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <div>
//                 <span className="font-medium">입력 토큰:</span>{" "}
//                 {ETH_TOKEN.symbol}
//               </div>
//               <div>
//                 <span className="font-medium">출력 토큰:</span>{" "}
//                 {USDC_TOKEN.symbol}
//               </div>
//               <div>
//                 <span className="font-medium">입력 금액:</span>{" "}
//                 {ethers.formatUnits(CurrentConfig.amountIn, ETH_TOKEN.decimals)}{" "}
//                 ETH
//               </div>
//               <div>
//                 <span className="font-medium">수수료:</span>{" "}
//                 {CurrentConfig.poolKey.fee / 10000}%
//               </div>
//             </div>
//           </div>

//           {/* 버튼들 */}
//           <div className="flex gap-4 mb-6">
//             <button
//               onClick={handleGetQuote}
//               disabled={loading}
//               className="px-6 py-2 bg-blue-600 text-black rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? "로딩중..." : "기본 설정으로 견적 받기 (1 ETH)"}
//             </button>

//             <button
//               onClick={handleCustomQuote}
//               disabled={loading}
//               className="px-6 py-2 bg-green-600 text-black rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? "로딩중..." : "커스텀 견적 받기 (0.5 ETH)"}
//             </button>
//           </div>

//           {/* 결과 표시 */}
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//               {error}
//             </div>
//           )}

//           {quote && (
//             <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
//               <h3 className="font-semibold mb-2">견적 결과:</h3>
//               <p className="text-lg">
//                 {quote} {USDC_TOKEN.symbol}
//               </p>
//             </div>
//           )}

//           {/* 사용법 안내 */}
//           <div className="mt-8 bg-blue-50 rounded-lg p-4">
//             <h3 className="text-lg font-semibold mb-3">사용법:</h3>
//             <ol className="list-decimal list-inside space-y-2 text-sm text-black  ">
//               <li>위의 RPC URL 필드에 유효한 Ethereum 노드 URL을 입력하세요</li>
//               <li>
//                 Alchemy, Infura 등의 서비스에서 API 키를 발급받아 사용하세요
//               </li>
//               <li>
//                 "견적 받기" 버튼을 클릭하여 현재 설정으로 스왑 견적을 확인하세요
//               </li>
//               <li>
//                 브라우저 개발자 도구 콘솔에서 자세한 로그를 확인할 수 있습니다
//               </li>
//             </ol>
//           </div>

//           {/* 참고사항 */}
//           <div className="mt-6 bg-yellow-50 rounded-lg p-4">
//             <h3 className="text-lg font-semibold mb-3">참고사항:</h3>
//             <ul className="list-disc list-inside space-y-1 text-sm text-black">
//               <li>이 예시는 Uniswap V4 Quoter 컨트랙트 사용법을 보여줍니다</li>
//               <li>실제 거래는 실행되지 않으며, 견적만 받아옵니다</li>
//               <li>callStatic을 사용하여 가스 비용 없이 시뮬레이션합니다</li>
//               <li>
//                 실제 프로덕션에서는 유효한 컨트랙트 주소를 사용해야 합니다
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// app/quote-demo/page.tsx
// "use client";
// import { useState, useTransition } from "react";
// import { getQuoteExactIn } from "../../uniswapv4/action/getQuote";

// export default function QuoteDemo() {
//   const [v, setV] = useState("1");
//   const [res, setRes] = useState<any>(null);
//   const [pending, start] = useTransition();

//   return (
//     <div className="p-6 space-y-4">
//       <div className="flex items-center gap-2">
//         <input
//           className="border px-3 py-2 rounded"
//           value={v}
//           onChange={(e) => setV(e.target.value)}
//           placeholder="ETH amount (e.g. 1)"
//         />
//         <button
//           className="px-4 py-2 rounded border"
//           onClick={() =>
//             start(async () => {
//               const r = await getQuoteExactIn(v);
//               setRes(r);
//             })
//           }
//           disabled={pending}
//         >
//           {pending ? "Quoting..." : "Get Quote (ETH→USDC)"}
//         </button>
//       </div>
//       {res && (
//         <pre className="text-sm bg-black/5 p-3 rounded">
//           {JSON.stringify(res, null, 2)}
//         </pre>
//       )}
//     </div>
//   );
// }
