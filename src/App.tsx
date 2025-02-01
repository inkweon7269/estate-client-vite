import { Suspense } from 'react';

import routes from '@/routes.ts';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';

const AppRoutes = () => {
    const element = useRoutes(routes);
    return element;
};

const App = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <AppRoutes />
            </Suspense>
        </Router>
    );
};

export default App;
