# Crypto-Tracker


## 1. 필요 라이브러리 설치

```
$ npm i react-router-dom@5.3.0
$ npm i --save-dev @types/react-router-dom
$ npm i react-query
```

<br><br>

## 2. react-router-dom
라우팅 설정
어플리케이션에 URL을 가질 수 있게 해 줌

```
// Router.tsx
function Router() {
    return <BrowserRouter>
        <Switch>
            <Route path="/:coinId">
                <Coin/>
            </Route>
            <Route path="/">
                <Coins></Coins>
            </Route>
        </Switch>
    </BrowserRouter>
}

// App.tsx
function App() {
  return (
    <Router></Router>
  );
}

```

<br><br>

## 3. Reset CSS
브라우저에 기본으로 설정된 CSS를 없애줌 (margin:0, padding:0, border:0)
https://meyerweb.com/eric/tools/css/reset/

<br>

#### 1) styled-reset을 사용
https://www.npmjs.com/package/styled-reset

```
import * as React from 'react'
import { Reset } from 'styled-reset'

const App = () => (
  <React.Fragment>
    <Reset />
    <div>Hi, I'm an app!</div>
  </React.Fragment>
)
```

https://github.com/zacanger/styled-reset/blob/master/src/index.ts

<br><br>

## 4. Fragment
ghost component

부모 컴포넌트 없이 여러개의 자식 컴포넌트를 리턴하게 해 줌
기존에는 여러개의 자식 컴포넌트를 리턴하려면 \<div\>로 리턴했어야 하는데

```
function App() {
  return (
    <div>
      <GlobalStyle/>
      <Router/>
    </div>
  );
}
```

Fragment를 이용하면 아래처럼 사용하면 됨

```
function App() {
  return (
    <>
      <GlobalStyle/>
      <Router/>
    </>
  );
}
```

<br><br>


## 5. Font
https://fonts.google.com/

원하는 폰트 선택 후 @import로 사용

```
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
```

이 부분은 작성한 createGlobalStyle 내 상단에 붙여넣는다.

```
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
...

```

이후 createGlobalStyle 하단에서 font를 사용한다.

```
const GlobalStyle = createGlobalStyle`
  ...
  // 몇가지 기본값 추가
  * {
    box-sizing: border-box
  }
  body {
    font-family: 'Source Sans Pro', sans-serif;
  }
  a {
    text-decoration: none;
  }
`
```

<br><br>

## 6. Theme
https://flatuicolors.com/

<br><br>

## 7. Link
a태그의 href를 이용하면 새로고침 되므로 href를 이용하지 않고
react-router-dom의 \<Link\> 태그를 이용한다


<br><br>

## 8. Featch Data
특정한 시기에만 코드를 실행하기 위해서는 useEffect()를 사용하면 됨.
useEffect()를 사용하면 코드를 component가 시작할 때 실행시킬지, component가 끝날 때 실행시킬지, 뭐든 변화가 일어날 때마다 실행시킬지 결정할 수 있음.

```
// 컴포넌트가 시작될 때 한번만 실행
useEffect(() => {

}, [])
```

<br>

```
// fetch data from api
const [coins, setCoins] = useState<CoinInterface[]>([]);
    useEffect(() => {
        // 즉시 실행 함수 (()=>{})()
        (async () => {
            const response = await fetch('https://api.coinpaprika.com/v1/coins');
            const json = await response.json();
            setCoins(json.slice(0, 100))
        })();
    }, [])
```

<br><br>

## 9. React-Router

https://v5.reactrouter.com/web/api/Link

\<Link to=\>에 string 뿐만 아니라 Location object를 보낼 수도 있음

```
<Link
  to={{
    pathname: "/courses",
    search: "?sort=name",
    hash: "#the-hash",
    state: { fromDashboard: true }
  }}
/>
```

프로젝트에서는 아래와 같이 사용

```
// Coins.tsx
<Link
    to={{
        pathname: `/${coin.id}`,
        state: { name: coin.name }
    }}
>
    <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
    {coin.name} &rarr;
</Link >
```

라우팅 하는 페이지에서는 react router DOM이 보내주는 location 오브젝트에 접근하기만 하면 된다.

```
// Coin.tsx

function Coin() {
    ...
    const location = useLocation();
    console.log(location);
    ...
}
```

대신 state를 사용하여 데이터를 보낼 경우 http://localhost:3000/btc-bitcoin 로 직접 접근했을 때는 
TypeError: Cannot read properties of undefined (reading 'name') 에러가 난다.
state가 생성되려면 Home 화면을 먼저 열어야 하기 때문에 아래와 같이 처리한다

```
// state가 있을 경우 name을 가져오고 없을 경우 Loading을 표시한다.
<Title>{state?.name || "Loading.."}</Title>

```

<br><br>

## 10. Nested Router
- route 안에 있는 또 다른 route
- 탭을 만들 때 유용

```
// chart.tsx
<Switch>
    <Route path={`/${coinId}/price`}>
        <Price />
    </Route>
    <Route path={`/${coinId}/chart`}>
        <Chart />
    </Route>
</Switch>
```

<br><br>

## 11. useRouteMatch()
특정한 URL에 있는지 여부를 알려줌.
url이 /:coinId/price일 경우에는 아래처럼 object 값을 받지만 
url이 다를 경우에는 null

```
import { useParams, useRouteMatch } from "react-router";

const priceMatch = useRouteMatch("/:coinId/price");

console.log(priceMatch); // { path: '/:coinId/price', url: '/btc-bitcoin/price', isExact: true, params: {…}}

```

<br><br>

## 12. React Query, useQuery()
- React Query makes fetching, caching, synchronizing and updating server state in your React applications a breeze.
- React Query를 사용하면 useEffect(), useState() 코드를 지워도 됨.
- React Query는 다른 스크린에서 다시 돌아와도 화면이 새로고침 되지 않음 (데이터를 캐시에 저장함) 리액트 쿼리는 데이터를 파괴하지 않음.
- React Query는 캐시를 사용하므로, 스크린에 다시 진입하더라도 호출한 API를 다시 불러오지 않음.
- https://react-query.tanstack.com/overview


```
$ npm i react-query
```

<br>

QueryClientProvider 하위에 있는 모든 컴포넌트에서는 queryClient 접근 가능 
```
 const queryClient = new QueryClient()
 
 export default function App() {
   return (
     <QueryClientProvider client={queryClient}>
       <Example />
     </QueryClientProvider>
   )
 }
```

<br>

```
// index.tsx
const queryClient = new QueryClient()

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById("root")
); 
```

<br>

useQuery는 아래와 같이 사용한다. useQuery()는 isLoading이라는 boolean 값을 리턴하는데, isLoading()을 쓰면 기존 코드에서 setLoading() 하던 코드를 대체할 수 있다.

<br>

아래는 기존에 개발한 코드

```
// Coins.tsx
const [coins, setCoins] = useState<CoinInterface[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    // 즉시 실행 함수 (()=>{})()
    (async () => {
        const response = await fetch('https://api.coinpaprika.com/v1/coins');
        const json = await response.json();
        setCoins(json.slice(0, 100));
        setLoading(false);
    })();
}, [])
```

<br>

useQuery()를 사용하면 위 코드를 모두 대체할 수 있다

```
// fetchCoins()는 api.ts 파일에 있음
const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins)
```

<br><br>

## 13. React Query Devtools
React Query에 있는 devtools을 import 해오면 캐시에 있는 query를 볼 수 있다.

```
// App.tsx
import { ReactQueryDevtools } from "react-query/devtools"

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen={true}/>
    </>

  );
}
```

<br>
useQuery() hook을 쓰는 방법은 첫번째 argument로 unique한 key를 주고, 두번째 argument는 fetcher 함수, 세번째는 옵션 object를 줄 수 있는데, refetchInterval 등의 값을 설정할 수 있다.
```
// coin.tsx
const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["ticker", coinId], 
    () => fetchCoinTickers(coinId),
    {
        refetchInterval: 5000, //5초
    }
);
```

<br><br>

## 14. APEXCHARTS.js
차트 라이브러리
https://apexcharts.com/docs/react-charts/

```
npm install --save react-apexcharts apexcharts
```

<br><br>

## 15. React Helmet

React Helmet는 문서의 header를 바꾸는 데 사용할 수 있음.
Helmet은 단지 head로 가는 direct link일 뿐이다.
header가 아니라 head

```
$ npm install react-helmet
$ npm i --save-dev @types/react-helmet
```

<br>

```
// Coin.tsx
    return (
      <Container>
        <Helmet>
            <title>
                {state?.name ? state.name : loading ? "Loading.." : infoData?.name}
            </title>
        </Helmet>
        </Container>
    )
```

