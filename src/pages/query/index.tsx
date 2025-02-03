import { useQuery } from '@tanstack/react-query';

const TodoPage = () => {
    const { isPending, isError, error, data } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            return response.json();
        },
    });

    if (isPending) return 'Loading...';

    if (isError) return 'An error has occurred: ' + error.message;

    return (
        <ul>
            {data.map((post: { id: number; title: string }) => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
};

export default TodoPage;
