import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
    font-family: Arial, sans-serif;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;
