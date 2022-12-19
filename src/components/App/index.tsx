import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from '../../config/routes';
import ErrorBoundary from '../ErrorBoundary';
import Layout from '../Layout';
import { Suspense } from 'react';
import Loader from '../Loader';
import Navbar from '../Navbar';
import PageFooter from '../Footer';
import { ConfigProvider } from 'antd';
import { ColourPalette } from '../../types/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const client = new QueryClient();

const App = (): JSX.Element => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: ColourPalette.ngtMidBlue,
          colorBgTextHover: ColourPalette.ngtLightBlue,
          colorBgTextActive: ColourPalette.ngtLightBlue,
        },
      }}
    >
      <Suspense fallback={<Loader />}>
        <ErrorBoundary>
          <QueryClientProvider client={client}>
            <Router>
              <Routes>
                {routes.map(({ element, path, hideHeader, hideFooter }, index) => (
                  <Route
                    key={index}
                    element={
                      <Layout
                        page={element}
                        header={!hideHeader ? <Navbar /> : undefined}
                        footer={!hideFooter ? <PageFooter /> : undefined}
                      />
                    }
                    path={path}
                  />
                ))}
              </Routes>
            </Router>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ErrorBoundary>
      </Suspense>
    </ConfigProvider>
  );
};

export default App;
