import { useParams } from 'react-router-dom';

const AboutDetail = () => {
    const { id } = useParams<'id'>();

    return <div>About {id}</div>;
};

export default AboutDetail;
