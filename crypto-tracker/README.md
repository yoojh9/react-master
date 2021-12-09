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

 
