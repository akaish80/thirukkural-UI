import React from 'react';
import { useLocation } from 'react-router-dom';
import './App.scss';
import ThemeProvider from './contexts/ThemeContext';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import Nav from './components/nav/nav.component';
import NotFound from './pages/PageNotFound/pagenotfound.component';
import { nav } from './components/constants';
import AppRoutes from './Routes';

function App() {
  const location = useLocation();
  const { pathname } = location;
  const isPathFound = nav.some((item) => item.link.toLowerCase() === pathname.toLowerCase());

  return (
    <ThemeProvider>
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        {isPathFound ? (
          <>
            <Nav location={location} />
            <div id="content">
              <AppRoutes />
            </div>
          </>
        ) : (
          <div id="content" className="pageNotFound">
            <NotFound />
          </div>
        )}
        <footer>
          <Footer />
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
