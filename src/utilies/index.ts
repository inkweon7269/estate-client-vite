import { Cookies, ReactCookieProps } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: string, options?: ReactCookieProps['defaultSetOptions']) => {
    return cookies.set(name, value, { ...options });
};

export const getCookie = (name: string) => {
    return cookies.get(name);
};

export const removeCookie = (name: string, options: ReactCookieProps['defaultSetOptions'] = { path: '/' }) => {
    return cookies.remove(name, options);
};
