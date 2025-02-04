import { useQueries } from '@tanstack/react-query';

const QueryListPage = () => {
    const ids = [1, 2, 3, 4];
    const queries = useQueries({
        queries: ids.map((id) => {
            return {
                queryKey: ['todo', id],
                queryFn: async () => {
                    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
                    return response.json();
                },
            };
        }),
        combine: (results) => {
            return {
                data: results.map((result) => result.data),
                pending: results.some((result) => result.isPending),
            };
        },
    });

    if (queries.pending) {
        return 'Loading...';
    }

    return (
        <ul>
            {queries.data.map((todo: any) => (
                <li key={todo.id}>{todo.title}</li>
            ))}
        </ul>
    );
};

export default QueryListPage;
