import React from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import Nav from './components/nav/nav.component';
import NotFound from './pages/PageNotFound/pagenotfound.component';
import { nav } from './components/constants';
import Routes from './Routes';


function App({ history }) {
  const { location } = history;
  const { pathname } = location;
  const isPathFound = nav.some((item) => item.link.toLowerCase() === pathname.toLowerCase());
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      {isPathFound ? (
        <>
          <Nav location={history.location} />
          <div id="content">
            <Routes />
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
  );
}

export default withRouter(App);
