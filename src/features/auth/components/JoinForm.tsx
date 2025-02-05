import { useJoinMutation } from '@/features/auth/hooks/user.ts';
import { JoinRequest } from '@/features/auth/interface/auth.request.interface.ts';
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

const JoinForm = () => {
    const { mutate } = useJoinMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<JoinRequest>({ resolver: yupResolver(schema) });

    const onSubmit: SubmitHandler<JoinRequest> = async (data) => {
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
                회원가입
            </Button>
        </form>
    );
};

export default JoinForm;
