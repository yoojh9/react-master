# React with TYPESCRIPT

```
$ npx create-react-app react-typescript --template typescript
```

<br><br>

## 1. styled-components 사용
타입스크립트는 기존 styled-components를 인식하지 못하므로 아래와 같이 추가로 명령어를 실행한다.

```
$ npm install styled-components
$ npm install --save @types/styled-components
```

<br><br>

## 2. typescript로 변환된 lib는 아래 링크에 있음

https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types


<br><br>

## 3. PropType
typescript는 PropType을 쓰는 대신 interface를 사용하면 됨

```TypeScript
interface CircleProps {
    bgColor: string;
}

const Circle = ({bgColor}: CircleProps) => <Container></Container>

```

<br>

#### 1) Optional PropType

```TypeScript
interface CircleProps {
    bgColor: string;
    borderColor?: string;
}
```

#### 2) Props default 값 설정

- text와 borderColor는 optional한 Props임.
- 각각 다른 방식으로 default 값을 설정함

```TypeScript
interface CircleProps {
    bgColor: string;
    borderColor?: string;
    text?: string;
}

const Circle = ({ bgColor, borderColor, text="default text"}: CircleProps) => {
    return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>{text}</Container>
}
```

<br><br>

## 4. State

#### 1) state 타입 지정

state에 default 값을 주면 해당 값에 맞게 타입이 자동으로 지정됨

```TypeScript
    const [counter, setCounter] = useState(1);

    setCounter(2);
    setCounter('3'); //error

```

타입스크립트를 이용하여 타입을 2가지 이상 지정할 수 있음 (거의 사용하지 않음)

```TypeScript
    const [counter, setCounter] = useState<number|string>(1);

    setCounter(2);
    setCounter("3"); //okay

```

<br><br>

## 5. Form

typescript를 이용한 state 관리

```TypeScript
  const [username, setUsername] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = event;
    console.log(event.currentTarget.value)
    setUsername(value)
  };
```

<br><br>

## 6. Themes
- styled-components와 typescript 연결
- https://styled-components.com/docs/api#typescript 참고

#### 1) Install styled-components on DefinitelyTyped

```
npm install @types/styled-components
```

<br>

#### 2) Create a declarations file (src/styled.d.ts)

```TypeScript
// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      main: string;
      secondary: string;
    };
  }
}
```

<br>

#### 3) Create a theme (ex. src/my-theme.ts)

```TypeScript
// my-theme.ts
import { DefaultTheme } from 'styled-components';

const myTheme: DefaultTheme = {
  borderRadius: '5px',

  colors: {
    main: 'cyan',
    secondary: 'magenta',
  },
};

export { myTheme };
```

<br>

https://github.com/yoojh9/react-master/commit/ceefe37ed574d00f0dab132de77d62666cd2fa10 참고

<br><br>

## 6. Event
타입스크립트에서 정의하는 이벤트 타입은 https://reactjs.org/docs/events.html 참고

<br><br>

## 7. library
앞으로 외부 라이브러리를 설치하게 되면, typescript로 변환된 @types/ 라이브러리가 있는지 한번 시도해보자

```
$ npm i styled-components
$ npm i --save-dev @types/styled-components
```
