import { useMutation, useQueryClient } from '@tanstack/react-query';

type Post = {
    title: string;
    body: string;
    userId: number;
};

const PostPage = () => {
    const queryClient = useQueryClient();

    const { mutate, error, isPending, isError } = useMutation({
        mutationFn: async (newPost: { title: string; body: string; userId: number }) => {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    title: newPost.title,
                    body: newPost.body,
                    userId: newPost,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            return response.json();
        },
        onMutate: async (newPost) => {
            // 낙관적 업데이트 전에 사용자 목록 쿼리를 취소해 잠재적인 충돌 방지!
            await queryClient.cancelQueries({ queryKey: ['posts'] });

            // 캐시된 데이터(사용자 목록) 가져오기!
            const previousPosts = queryClient.getQueryData<Post[]>(['posts']);

            // 낙관적 업데이트
            if (previousPosts) {
                queryClient.setQueryData<Post[]>(['posts'], [...previousPosts, newPost]);
            }

            // 각 콜백의 context로 전달할 데이터 반환!
            return { previousPosts };
        },
        onSuccess: async (data, newPost, context) => {
            console.log('onSuccess', data, newPost, context);
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
        onError: (error, newPost, context) => {
            console.log('onError', error, newPost, context);
            // 변이 실패 시, 낙관적 업데이트 결과를 이전 사용자 목록으로 되돌리기!
            if (context) {
                queryClient.setQueryData(['posts'], context.previousPosts);
            }
        },
        onSettled: (data, error, variables, context) => {
            console.log('onSettled', data, error, variables, context);
        },
        retry: 3, // 변이 실패 시 3번 재시도
        retryDelay: 500, // 0.5초 간격으로 재시도
    });

    const handleSubmit = () => {
        const data = {
            title: 'Airtable',
            body: 'Nice To meet you',
            userId: 101,
        };
        mutate(data);
    };

    return (
        <div>
            <button onClick={handleSubmit}>제출</button>
        </div>
    );
};

export default PostPage;
