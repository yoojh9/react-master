# react with typescript

```
$ npx create-react-app react-typescript --template typescript
```

<br>

### 1. styled-components 사용
타입스크립트는 기존 styled-components를 인식하지 못하므로 아래와 같이 추가로 명령어를 실행한다.

```
$ npm install styled-component
$ npm install --save @types/styled-components
```

<br>

### 2. typescript로 변환된 lib는 아래 링크에 있음

https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types


<br>

### 3. PropType
typescript는 PropType을 쓰는 대신 interface를 사용하면 됨

```
interface CircleProps {
    bgColor: string;
}

const Circle = ({bgColor}: CircleProps) => <Container></Container>

```
