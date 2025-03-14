export interface Post {
    id?: number;
    title: string | null;
    body: string | null;
    owner?: number;
}

export interface PostsListProp {
    userId: string | null;
}

export interface PostDetailProp {
    userId: string | null;
    postId: string | null
}