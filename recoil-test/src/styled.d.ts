// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
    export interface darkTheme {
        textColor: string;
        bgColor: string;
        accentColor: string;
        cardBgColor: string;
    }
}