import React, {
  Suspense,
  Fragment,
  lazy
} from 'react';
import {
  Switch,
  Redirect,
  Route,  
} from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import LoginView from 'src/views/auth/LoginView';
import LoadingScreen from 'src/components/LoadingScreen';
import AuthGuard from 'src/components/AuthGuard';
import GuestGuard from 'src/components/GuestGuard';

export const renderRoutes = (routes = []) => (

  <Suspense fallback={<LoadingScreen />}>
    
      <Switch>
        {routes.map((route, i) => {
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;
          const Component = route.component;

          return (

            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <Guard>
                  <Layout>
                    {route.routes
                      ? renderRoutes(route.routes)
                      : <Component {...props} />}
                  </Layout>
                </Guard>
              )}
            />

          );
        })}

      </Switch>
    
  </Suspense >

);

const routes = [
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('src/views/errors/NotFoundView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    path: '/login-unprotected',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/register',
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  {
    exact: true,
    path: '/register-unprotected',
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  {
    path: '/app',
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/app/lobby/:id?',
        //component: LobbyView
        component: lazy(() => import('src/views/lobby/LobbyView'))
      },
      {
        exact: true,
        path: '/app/agenda',
        component: lazy(() => import('src/views/agenda/AgendaView'))
      },
      {
        exact: true,
        path: '/app/keynote',
        component: lazy(() => import('src/views/keynote/KeynoteView'))
      },
      {
        exact: true,
        path: '/app/exhibition',
        component: lazy(() => import('src/views/exhibition/ExhibitionView'))
      },
      {
        exact: true,
        path: '/app/exhibitor/:exhibitorname?/:exhibitorid?',
        component: lazy(() => import('src/views/exhibition/ExhibitorView'))
      },
      {
        exact: true,
        path: '/app/networking',
        component: lazy(() => import('src/views/network/NetworkView'))
      },
      {
        exact: true,
        path: '/app/resources',
        component: lazy(() => import('src/views/resources/ResourceView'))
      },
      {
        exact: true,
        path: '/app/helpdesk',
        component: lazy(() => import('src/views/helpdesk/HelpDeskView'))
      },
      {
        exact: true,
        path: '/app/profile',
        component: lazy(() => import('src/views/account/AccountView'))
      },
      {
        exact: true,
        path: '/app/messages',
        component: lazy(() => import('src/views/messages/MessageView'))
      },
      {
        exact: true,
        path: '/app/3D',
        component: lazy(() => import('src/views/3D'))
      },
      // {
      //   exact: true,
      //   path: '/app/briefcase',
      //   component: lazy(() => import('src/views/briefcase/BriefcaseView'))
      // },
      {
        exact: true,
        path: '/app/leaderboard',
        component: lazy(() => import('src/views/leaderboard/LeaderboardView'))
      },
      {
        exact: true,
        path: '/app/feedback',
        component: lazy(() => import('src/views/feedback'))
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  },
  {
    path: '*',
    // layout: MainLayout,   
    guard: GuestGuard, 
    routes: [
      {
        exact: true,
        path: '/',
        component: LoginView
      },

      {
        component: () => <Redirect to="/404" />
      }
    ]
  }
];

export default routes;
