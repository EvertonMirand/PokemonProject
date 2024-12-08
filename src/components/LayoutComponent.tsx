'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '@/store/themeSlice';
import { GlobalStyle } from '@/styles/globals';
import ThemeToggle from './ThemeToggle';
import { lightTheme, darkTheme } from '@/styles/themes';
import { ThemeProvider } from 'styled-components';
import { RootState } from '@/store';

const LayoutComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const themeName = useSelector((state: RootState) => state.theme.theme); // light or dark
  const dispatch = useDispatch();

  const theme = themeName === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ThemeToggle />
      <main>{children}</main>
    </ThemeProvider>
  );
};

export default LayoutComponent;
