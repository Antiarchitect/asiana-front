import { useMutation } from '@apollo/client';
import { message, Spin } from 'antd';
import { FC, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { VERIFY_TOKEN_AUTH } from '../graph/mutations/verifyToken';
import { REFRESH_TOKEN_AUTH } from '../graph/mutations/refreshToken';
import { getCookie } from '../services/cookie';
import { connect } from 'react-redux';
import { setToken } from '../actions';

interface AuthProviderProps {
  token: string;
  setToken: (token: string) => void;
}

const AuthProvider: FC<AuthProviderProps> = ({
  children,
  token: tokenData,
  setToken,
}) => {
  const history = useHistory();
  const [verifyTokenRequest, { data, loading }] =
    useMutation(VERIFY_TOKEN_AUTH);
  const [refreshTokenRequest, { loading: refreshLoading }] =
    useMutation(REFRESH_TOKEN_AUTH);
  const token = getCookie('token');
  const tokenRefresh = getCookie('refreshToken');

  let checkTitle: any = null;

  useEffect(() => {
    if (checkTitle) {
      clearInterval(checkTitle);
    }

    checkTitle = setInterval(
      () =>
        history.location.pathname.replace(/\/site-pages\/\d/, '') !== ''
          ? (document.title = 'Кореана')
          : void 0,
      100,
    );

    return () => checkTitle && clearInterval(checkTitle);
  }, [history]);

  useEffect(() => {
    if (token) {
      setToken(token);
    }
  }, [setToken, token]);

  const refreshToken = useCallback(() => {
    refreshTokenRequest({
      variables: { token: tokenRefresh },
    }).catch((res) => {
      res.graphQLErrors.forEach((error: { message: string }) => {
        message.error(error.message);
      });
    });
  }, [refreshTokenRequest, tokenRefresh]);

  const verifyToken = useCallback(() => {
    if (!token) {
      //   history.push('/auth');
    } else {
      verifyTokenRequest({ variables: { token } }).catch((res) => {
        res.graphQLErrors.forEach((error: { message: string }) => {
          if (error.message === 'Signature has expired') {
            refreshToken();
          }
        });
      });
    }
  }, [token, verifyTokenRequest, refreshToken]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  useEffect(() => {
    if (data) {
      if (!data.verifyToken) {
        //   history.push('/auth');
      } else {
        history.push('/');
      }
    }

    if (tokenData && history.location.pathname === '/login') {
      history.push('/');
    }
  }, [data, history, tokenData]);

  return (
    <Spin spinning={loading || refreshLoading}>
      <div>{children}</div>
    </Spin>
  );
};

const mapStateToProps = (state: any) => {
  return {
    token: state.token,
  };
};

export default connect(mapStateToProps, { setToken })(AuthProvider);
