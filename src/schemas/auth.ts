import * as yup from 'yup';

export const EMAIL_SCHEMA = yup.string().email('유효한 이메일을 입력해주세요').required('이메일을 입력해주세요');
export const PASSWORD_SCHEMA = yup
    .string()
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다')
    .required('비밀번호를 입력해주세요');
