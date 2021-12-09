// import original module declarations
import 'styled-components';
import { StringLiteralLike } from 'typescript';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    btnColor: string
  }
}