import loadable from '@loadable/component';
import React from 'react';
import { Route, Switch } from 'react-router';
import NotFound from './pages/PageNotFound/pagenotfound.component';

const Routes = () => {
  const HomePageWrapper = loadable(() => import(/* webpackChunkName: 'app-home' */ './pages/homepage/homepage.component'));

  const ThirrukurralWrapper = loadable(() => import(/* webpackChunkName: 'app-thirrukurral' */ './pages/thirukurral/thirukurral.component'));

  const ExcerciseWrapper = loadable(() => import(/* webpackChunkName: 'app-practice' */ './pages/practice/practice.component'));
  return (
    <Switch>
      <Route path="/" exact component={HomePageWrapper} />
      <Route path="/kurral" exact component={ThirrukurralWrapper} />
      <Route path="/kurral/excercise" exact component={ExcerciseWrapper} />
      <Route component={NotFound} />
    </Switch>
  );
};


export default Routes;
