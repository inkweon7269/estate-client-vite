import { useLoginMutation } from '@/features/auth/hooks/user.ts';
import { LoginRequest } from '@/features/auth/interface/auth.request.interface.ts';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { EMAIL_SCHEMA, PASSWORD_SCHEMA } from '@/schemas/auth.ts';

const schema = yup.object({
    email: EMAIL_SCHEMA,
    password: PASSWORD_SCHEMA,
});

const LoginFrom = () => {
    const { mutate } = useLoginMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequest>({ resolver: yupResolver(schema) });

    const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
        mutate(data);
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

export default LoginFrom;
