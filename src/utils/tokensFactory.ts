import { auth } from '@/api/auth';

type SetTokensProps = {
  access_token: string;
  refresh_token?: string;
};

export function setTokens({ access_token, refresh_token }: SetTokensProps) {
  access_token && localStorage.setItem('access_token', access_token);
  // eslint-disable-next-line eqeqeq
  if (refresh_token && refresh_token != '123') localStorage.setItem('refresh_token', refresh_token);
}
export function deleteTokens() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

export async function refreshTokens(refreshToken: string) {
  const { data } = await auth.refresh.refresh_token(refreshToken);

  return data;
}
