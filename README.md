# Uniswap V4 Quoter Integration

이 프로젝트는 Uniswap V4의 Quoter 컨트랙트를 사용하여 스왑 견적을 가져오는 Next.js 애플리케이션입니다.

## 🔧 구조

```
src/
├── app/
│   └── page.tsx              # 메인 페이지 (견적 결과 표시)
├── uniswapv4/
│   ├── config.ts            # 스왑 설정 (풀 키, 금액 등)
│   ├── constants.ts         # 토큰 주소, ABI, RPC URL
│   ├── quoter.ts            # Quoter 컨트랙트 인스턴스
│   └── action/
│       └── getQuote.ts      # 견적 가져오기 함수
```

## 📋 주요 파일 설명

### `constants.ts`

- **토큰 정의**: ETH, USDC 토큰 설정
- **컨트랙트 주소**: Uniswap V4 Quoter 주소
- **ABI**: Quoter 컨트랙트의 전체 ABI
- **RPC URL**: 이더리움 노드 연결

### `config.ts`

- **풀 설정**: currency0/currency1, fee, tickSpacing, hooks
- **스왑 방향**: `zeroForOne` (ETH → USDC)
- **금액**: 1 ETH 입력으로 설정
- **후크 데이터**: 빈 바이트 데이터

### `quoter.ts`

- **컨트랙트 인스턴스**: ethers.js를 사용한 Quoter 컨트랙트 연결
- **자동 RPC 연결**: constants에서 RPC URL 가져와서 연결

### `action/getQuote.ts`

- **견적 함수**: `quoteExactInputSingle` 호출
- **매개변수 구성**: config의 설정을 사용하여 견적 요청
- **결과 포맷**: USDC decimals에 맞춰 사람이 읽기 쉬운 형태로 변환

### `page.tsx`

- **서버 컴포넌트**: 서버에서 견적을 가져와 렌더링
- **간단한 UI**: 견적 결과를 화면에 표시

## ⚙️ 설정

### 1. 환경 변수

```bash
# .env.local
NEXT_PUBLIC_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
```

### 2. 토큰 설정 (constants.ts)

```typescript
export const ETH_TOKEN = new Token(
  ChainId.MAINNET,
  "0x0000000000000000000000000000000000000000", // ETH 주소
  18,
  "ETH",
  "Ether"
);

export const USDC_TOKEN = new Token(
  ChainId.MAINNET,
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // USDC 주소
  6,
  "USDC",
  "USDC"
);
```

### 3. 풀 설정 (config.ts)

```typescript
export const CurrentConfig: SwapExactInSingle = {
  poolKey: {
    currency0: ETH_TOKEN.address,
    currency1: USDC_TOKEN.address,
    fee: 500, // 0.05% 수수료
    tickSpacing: 10,
    hooks: "0x0000000000000000000000000000000000000000",
  },
  zeroForOne: true, // ETH → USDC
  amountIn: "1000000000000000000", // 1 ETH
  amountOutMinimum: "0",
  hookData: "0x00",
};
```

## 🚀 사용법

### 개발 서버 실행

```bash
npm install
npm run dev
```

### 견적 가져오기

```typescript
import { getQuote } from "@/uniswapv4/action/getQuote";

// 서버 컴포넌트에서
const quote = await getQuote();
console.log(quote); // 예: "4211837172" (raw USDC amount)

// 또는 직접 호출
const result = await getQuote();
// 콘솔에 "4211.837172" (포맷된 USDC 금액) 출력
```

## 📊 결과 해석

견적 결과는 **1 ETH를 스왑했을 때 받을 수 있는 USDC 금액**입니다.

예시 출력:

- **Raw**: `4211837172n` (bigint, 6 decimals)
- **Formatted**: `4211.837172` (USDC 금액)
- **의미**: 1 ETH = 4,211.84 USDC

## 🔍 기술 세부사항

### Quoter 함수 호출

```typescript
const params = {
  poolKey: CurrentConfig.poolKey,
  zeroForOne: CurrentConfig.zeroForOne,
  exactAmount: CurrentConfig.amountIn,
  hookData: CurrentConfig.hookData,
};

const result = await quoterContract.quoteExactInputSingle.staticCall(params);
// result = [amountOut, gasEstimate]
```

### staticCall 사용 이유

- Uniswap V4 Quoter는 `nonpayable` 함수이지만 실제 상태 변경 없이 결과만 반환
- `staticCall`을 사용하여 가스 비용 없이 시뮬레이션 실행
- 실제 거래는 발생하지 않음

## ⚠️ 주의사항

1. **실제 풀 존재 확인**: 설정한 `poolKey`가 실제로 배포된 풀과 일치해야 함
2. **RPC 한도**: 무료 RPC는 요청 한도가 있을 수 있음
3. **네트워크**: 현재 이더리움 메인넷 설정
4. **슬리피지**: 실제 스왑 시 견적과 다를 수 있음

## 🛠️ 트러블슈팅

### "no matching fragment" 에러

- ABI와 함수 호출 방식 불일치
- 매개변수를 객체로 묶어서 전달 확인

### "pool does not exist" 에러

- `poolKey`의 fee, tickSpacing, hooks 값 확인
- 실제 배포된 풀과 설정이 일치하는지 확인

### RPC 연결 에러

- `NEXT_PUBLIC_RPC_URL` 환경 변수 확인
- RPC 제공자 상태 및 API 키 확인

## 📚 참고 자료

- [Uniswap V4 Documentation](https://docs.uniswap.org/contracts/v4/overview)
- [ethers.js Documentation](https://docs.ethers.org/)
- [Next.js Documentation](https://nextjs.org/docs)
