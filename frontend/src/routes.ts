type Route = {
    name: string;
    path: string | ((id: string) => string);
}

export const routes: { [key: string]: Route } = {
    api: { name: 'api', path: '/api/' },
    accounts: { name: 'accounts', path: '/accounts/' },
    login: { name: 'login', path: '/accounts/login/' },
    home: { name: 'home', path: '/' },
    posts: { name: 'posts', path: '/posts/' },
    postDetail: { name: 'postDetail', path: (id: string) => `/posts/${id}/` }
};

export const getPostDetailPath = (id: number) => {
    const path = routes.postDetail.path;
    return typeof path === 'function' ? path(String(id)) : path;
};

export const redirect = (pathName: string, nextUrl=false): void => {
    console.log('aaa')
    if (!pathName) {
        pathName = routes.home.path as string;
    };
    const nextPath: string | null = nextUrl ? `?next=${window.location.pathname}` : '';
    window.location.href = `${pathName}${nextPath}`

}