import { ThemeProvider } from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { GlobalStyle, theme } from '@/styles';

// pages
import { MainPage } from '@/pages';

// layout
import { MainLayout } from '@/components';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
