'use client';

import { FC, ReactNode,  } from 'react';
import { Provider } from 'react-redux'; // Redux Provider to wrap the app
import store  from '../store'; // Your Redux store
// Theme toggle component
import LayoutComponent from '@/components/LayoutComponent';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
 

  return (
    <html lang="en">
      <body>
        {/* Wrap the whole app in the Redux <Provider> */}
        <Provider store={store}>
          {/* Apply global styles based on the theme from Redux */}
          <LayoutComponent  >{children}</LayoutComponent>
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
