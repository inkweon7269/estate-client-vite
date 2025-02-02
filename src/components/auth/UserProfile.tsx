import { useEffect, useState } from 'react';

import { getUserProfileApi } from '@/api/auth.ts';
import { getCookie } from '@/utilies';

import { UserResponse } from '@/components/auth/interface/auth.response.interface.ts';

const UserProfile = () => {
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

export default UserProfile;
