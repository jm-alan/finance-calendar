import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import RequireAuth from './components/Auth/RequireAuth';

import Home from './components/Home';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import { Load } from './store/session';

export default function App () {
  const dispatch = useDispatch();

  const loaded = useSelector((state: State) => state.session.loaded);

  useEffect(() => {
    dispatch(Load());
  }, [dispatch]);

  return (loaded && (
    <>
      <NavBar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <RequireAuth>
          <Route path='/users/me/'>
            <Profile />
          </Route>
        </RequireAuth>
      </Switch>
    </>
  )) || null;
}
