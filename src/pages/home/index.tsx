import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { EMAIL_SCHEMA, PASSWORD_SCHEMA } from '@/schemas/auth.ts';

import Button from '@/components/Button.tsx';

interface LoginInputs {
    email: string;
    password: string;
}

const schema = yup.object({
    email: EMAIL_SCHEMA,
    password: PASSWORD_SCHEMA,
});

const Home = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputs>({ resolver: yupResolver(schema) });

    const onSubmit: SubmitHandler<LoginInputs> = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>이메일</label>
                <input type='email' {...register('email')} />
                <ErrorMessage errors={errors} name='email' />
            </div>
            <div>
                <label>비밀번호</label>
                <input type='password' {...register('password')} />
                <ErrorMessage errors={errors} name='password' />
            </div>
            <Button />
        </form>
    );
};

export default Home;
