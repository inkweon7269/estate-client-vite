import { useUserProfileQuery } from '@/features/auth/hooks/queries/useUserProfileQuery.ts';

const UserProfile = () => {
    const { isPending, isError, error, data } = useUserProfileQuery();

    if (isPending) return 'Loading...';

    if (isError) return 'An error has occurred: ' + error.message;

    return (
        <div>
            <p>{data.id}</p>
            <p>{data.createdAt}</p>
            <p>{data.email}</p>
        </div>
    );
};

export default UserProfile;
