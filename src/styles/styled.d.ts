import 'styled-components';

// Defina os temas disponíveis
declare module 'styled-components' {
  export interface DefaultTheme {
    name: 'light' | 'dark';
    colors: {
      background: string;
      text: string;
      primary: string;
      secondary: string;
    };
  }
}