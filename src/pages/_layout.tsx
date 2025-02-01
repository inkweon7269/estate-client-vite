import { Suspense } from 'react';

import theme from '@/styles/theme';
import { ConfigProvider } from 'antd';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <ConfigProvider theme={theme}>
            <div>
                <Suspense fallback={'loading...'}>
                    <Outlet />
                </Suspense>
            </div>
        </ConfigProvider>
    );
};

export default Layout;
