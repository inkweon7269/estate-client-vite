import { useEffect, useState } from 'react';

import { getUserProfileApi } from '@/api/auth.ts';
import { getCookie } from '@/utilies';

interface UserResponse {
    id: number;
    createdAt: string;
    email: string;
}

const User = () => {
    const [user, setUser] = useState<UserResponse | null>(null);

    useEffect(() => {
        (async () => {
            const accessToken = getCookie('accessToken');
            const res = await getUserProfileApi(accessToken);
            setUser(res.data);
        })();
    }, []);

    return (
        <ul>
            <li>{user?.id}</li>
            <li>{user?.createdAt}</li>
            <li>{user?.email}</li>
        </ul>
    );
};

export default User;
