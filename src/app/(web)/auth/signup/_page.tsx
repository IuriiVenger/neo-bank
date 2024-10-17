'use client';

import { useEffect } from 'react';

import SignUp from '@/components/Auth/SignUp';
import useAuth from '@/hooks/useAuth';
import { useAppDispatch } from '@/store';

const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const { resetAuthState, ...authHandlers } = useAuth(dispatch);

  useEffect(() => () => resetAuthState(), []);

  return <SignUp {...authHandlers} />;
};
export default SignUpPage;
