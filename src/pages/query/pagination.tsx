import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

const PaginationPage = () => {
    const [page, setPage] = useState(1);

    const { isPending, data } = useQuery({
        queryKey: ['posts', page],
        queryFn: async () => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`);
            return response.json();
        },
    });

    if (isPending) return 'Loading...';

    const nextPage = () => setPage((prevPage) => prevPage + 1);
    const prevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

    return (
        <div>
            <ul>
                {data.map((post: { id: number; title: string }) => (
                    <li key={post.id}>
                        {post.id} : {post.title}
                    </li>
                ))}
            </ul>
            <button onClick={prevPage}>Previous</button>
            <button onClick={nextPage}>Next</button>
        </div>
    );
};

export default PaginationPage;
