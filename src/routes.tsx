import { lazy } from 'react';

import GlobalLayout from './pages/_layout';

const Index = lazy(() => import('@/pages/index'));
const Home = lazy(() => import('@/pages/home'));
const About = lazy(() => import('@/pages/about'));
const AboutDetail = lazy(() => import('@/pages/about/[id]'));

export const routes = [
    {
        path: '/',
        element: <GlobalLayout />,
        children: [
            { path: '/', element: <Index /> },
            { path: '/home', element: <Home /> },
            { path: '/about', element: <About /> },
            { path: '/about/:id', element: <AboutDetail /> },
        ],
    },
];

export const pages = [{ route: '/' }, { route: '/home' }, { route: '/about' }, { route: '/about/:id' }];
