import { postLoginApi } from '@/api/auth.ts';
import { setCookie } from '@/utilies';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { EMAIL_SCHEMA, PASSWORD_SCHEMA } from '@/schemas/auth.ts';

interface LoginInputs {
    email: string;
    password: string;
}

const schema = yup.object({
    email: EMAIL_SCHEMA,
    password: PASSWORD_SCHEMA,
});

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputs>({ resolver: yupResolver(schema) });

    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        try {
            const res = await postLoginApi(data);
            const { accessToken, refreshToken } = res.data;

            setCookie('accessToken', accessToken, { path: '/' });
            setCookie('refreshToken', refreshToken, { path: '/' });
        } catch (error) {
            console.error(error);
        }
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
            <Button type='primary' htmlType='submit'>
                로그인
            </Button>
        </form>
    );
};

export default Login;
