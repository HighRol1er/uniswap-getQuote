import { getQuote } from "@/uniswapv4/action/getQuote";

export default async function Home() {
  const quote = await getQuote();
  return <div>{quote}</div>;
}
