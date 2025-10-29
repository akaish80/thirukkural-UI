import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './App.scss';
import ThemeProvider from './contexts/ThemeContext';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import Nav from './components/nav/nav.component';
import NotFound from './pages/PageNotFound/pagenotfound.component';
import Chatbot from './components/chatbot/Chatbot';
import { nav } from './components/constants';
import AppRoutes from './Routes';
import { loadContent } from './redux/content/content.slice';
// import { loadContent } from './redux/content/content-action';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const { pathname } = location;
  const isPathFound = nav.some((item) => item.link.toLowerCase() === pathname.toLowerCase());

  useEffect(() => {
    dispatch(loadContent());
  }, [dispatch]);

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
        <Chatbot />
      </div>
    </ThemeProvider>
  );
}

export default App;
