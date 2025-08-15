import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { register } from './serviceWorker';
import { store } from './redux/store';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <App />
        </Provider>
      </DndProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
register();