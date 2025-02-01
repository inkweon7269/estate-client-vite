import React from 'react';

type ComponentModule = {
    default: React.ComponentType<any>;
};

interface RouteConfig {
    path: string;
    element: React.ReactElement;
}

type LayoutComponent = React.ComponentType<{ children: React.ReactNode }>;

const modules = import.meta.glob<ComponentModule>('./pages/**/*.tsx');

// 주어진 경로에서 가능한 모든 레이아웃 경로를 찾는 함수
function findLayoutPaths(pagePath: string): string[] {
    const segments = pagePath.replace('./pages', '').split('/').filter(Boolean);

    const layouts: string[] = [];
    let currentPath = './pages';

    // 루트 레이아웃을 먼저 추가
    layouts.push(`${currentPath}/_layout.tsx`);

    // 각 세그먼트별 레이아웃 경로 추가
    for (const segment of segments) {
        if (segment.endsWith('.tsx')) continue;
        currentPath = `${currentPath}/${segment}`;
        layouts.push(`${currentPath}/_layout.tsx`);
    }

    return layouts;
}

// 중첩된 레이아웃으로 컴포넌트를 감싸는 함수
function wrapWithLayouts(Component: React.ComponentType, layouts: Array<LayoutComponent | null>): React.ReactElement {
    return React.createElement(
        React.Suspense,
        { fallback: React.createElement('div', null, 'Loading...') },
        layouts.reduceRight((children, Layout) => {
            return Layout ? React.createElement(Layout, null, children) : children;
        }, React.createElement(Component)),
    );
}

function normalizeRoutePath(path: string): string {
    return path
        .replace('./pages', '')
        .replace(/\/index\.tsx$/, '/')
        .replace(/\.tsx$/, '')
        .replace(/\[([^\]]+)\]/g, ':$1');
}

const routes: RouteConfig[] = Object.keys(modules)
    .filter((path) => !path.includes('/_layout')) // 레이아웃 파일 제외
    .map((path) => {
        const routePath = normalizeRoutePath(path);

        // 가능한 모든 레이아웃 경로 찾기
        const layoutPaths = findLayoutPaths(path);

        // 각 경로에 대한 레이아웃 컴포넌트 로드
        const layouts = layoutPaths.map((layoutPath) =>
            modules[layoutPath] ? React.lazy(() => modules[layoutPath]() as Promise<ComponentModule>) : null,
        );

        const Component = React.lazy(() => modules[path]() as Promise<ComponentModule>);

        return {
            path: routePath === '' ? '/' : routePath,
            element: wrapWithLayouts(Component, layouts),
        };
    });

export default routes;
