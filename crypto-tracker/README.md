# React with TYPESCRIPT


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


 
