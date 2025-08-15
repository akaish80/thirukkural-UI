import loadable from '@loadable/component';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/PageNotFound/pagenotfound.component';

const AppRoutes = () => {
  const HomePageWrapper = loadable(() => import(/* webpackChunkName: 'app-home' */ './pages/homepage/homepage.component'));

  const ThirrukurralWrapper = loadable(() => import(/* webpackChunkName: 'app-thirrukurral' */ './pages/thirukurral/thirukurral.component'));

  const ExcerciseWrapper = loadable(() => import(/* webpackChunkName: 'app-practice' */ './pages/practice/practice.component'));
  return (
    <Routes>
      <Route path="/" element={<HomePageWrapper />} />
      <Route path="/kurral" element={<ThirrukurralWrapper />} />
      <Route path="/kurral/excercise" element={<ExcerciseWrapper />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};


export default AppRoutes;
