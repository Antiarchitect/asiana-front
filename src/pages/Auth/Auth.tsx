import { FC, useCallback, useEffect, useState } from 'react';
import './Auth.scss';
import Warning from '../../components/Warning/Warning';
import { Button, Input, message, Spin, Tabs } from 'antd';
import { useMutation } from '@apollo/client';
import { TOKEN_AUTH } from '../../graph/mutations/tokenAuth';
import { CREATE_USER } from '../../graph/mutations/createUser';
import { useHistory } from 'react-router-dom';
import { setCookie } from '../../services/cookie';
import { connect } from 'react-redux';
import { setToken } from '../../actions';

interface IExternalProps {}

const { TabPane } = Tabs;

interface IProps extends IExternalProps {
  setToken: (token: string) => void;
  token: string;
}

const Auth: FC<IProps> = ({ setToken, token }) => {
  const history = useHistory();
  // eslint-disable-next-line no-useless-escape
  const redirectUrl = history.location.search.replace(/.+\=/, '');

  const [tokenAuth, { data: tokenAuthData, loading }] = useMutation(TOKEN_AUTH);
  const [createUser, { data: createUserData, loading: createUserLoading }] =
    useMutation(CREATE_USER);
  const [tab, setTab] = useState('1');

  function updateTab(key: string) {
    setTab(key);
  }

  useEffect(() => {
    if (token) {
      history.push('/');
    }
  }, [token, history]);

  const onSubmitRegister = useCallback(
    (e: any) => {
      e.preventDefault();
      const formData: any = new FormData(e.target);
      const data = {} as any;
      for (const [name, value] of formData) {
        data[name] = value;
      }
      createUser({ variables: data }).catch((res: any) => {
        res.graphQLErrors.forEach((error: { message: string }) => {
          message.error(error.message);
        });
      });
    },
    [createUser],
  );

  const onSubmitLogin = useCallback(
    (e) => {
      e.preventDefault();
      const formData: any = new FormData(e.target);
      const data = {} as any;
      for (const [name, value] of formData) {
        data[name] = value;
      }
      tokenAuth({ variables: data })
        .then(({ data }) => {
          console.log(data.tokenAuth);
          if (redirectUrl) {
            window.location.href = redirectUrl;
          }
        })
        .catch((res) => {
          res.graphQLErrors.forEach((error: { message: string }) => {
            message.error(error.message);
          });
        });
    },
    [tokenAuth, redirectUrl],
  );

  useEffect(() => {
    if (createUserData?.createUser) {
      message.success('???? ?????????????? ????????????????????????????????');
      setCookie('token', createUserData.createUser.token);
      setCookie('refreshToken', createUserData.createUser.refreshToken);
      setToken(createUserData.createUser.token);
      history.push('/');
    }
  }, [createUserData, history, setToken]);

  useEffect(() => {
    if (tokenAuthData?.tokenAuth) {
      message.success('???? ?????????????? ????????????????????????');
      setCookie('token', tokenAuthData.tokenAuth.token);
      setCookie('refreshToken', tokenAuthData.tokenAuth.refreshToken);
      setToken(tokenAuthData.tokenAuth.token);
      history.push('/');
    }
  }, [tokenAuthData, history, setToken]);

  const title =
    tab === '1'
      ? '?????????????????????? ?????? ?????????????????? ????????????????'
      : tab === '2'
      ? '???????? ?????? ?????????????????? ????????????????'
      : '??????????????';

  return (
    <Spin spinning={loading || createUserLoading}>
      <div className="page-with-header">
        <div className="container">
          <Warning className="mt-5">
            <div className="break-all">
              Notice: Undefined index: tid in drupal_page_get_cache() (line 1315
              of /var/www/koreanaparts.ru/includes/bootstrap.inc).
            </div>
          </Warning>
          <h1 className="Auth-title mt-2">{title}</h1>

          <Tabs
            className="Auth-block-tabs"
            defaultActiveKey="1"
            onChange={updateTab}>
            <TabPane tab="??????????????????????" key="1">
              <form onSubmit={onSubmitRegister}>
                <p className="Auth-paragraph mb-1">Email-?????????? * :</p>
                <Input
                  name="username"
                  className="Auth-line-of-input"
                  placeholder="?????????????? ??????????"
                />
                <p className="mb-1 mt-3">
                  {' '}
                  <b>???????????? *</b>{' '}
                </p>
                <Input
                  name="password"
                  type="password"
                  className="Auth-line-of-input"
                  placeholder="Login"
                />
                <div>
                  <Button htmlType="submit" className="Auth-sign-up-button">
                    <p className="Auth-text-button "> ??????????????????????</p>
                  </Button>
                </div>
              </form>
            </TabPane>
            <TabPane tab="????????" key="2">
              <form onSubmit={onSubmitLogin}>
                <div className="Auth-border">
                  <p className="mb-1">
                    {' '}
                    <b>?????????? *</b>{' '}
                  </p>
                  <Input
                    name="username"
                    className="Auth-line-of-input"
                    placeholder="Login"
                  />
                  <p>
                    ???? ???????????? ????????????????????????????, ?????????????????? ?????? ???????????????????????? ??????
                    ?????????? ?????????????????????? ??????????.
                  </p>
                  <p className="mb-1">
                    {' '}
                    <b>???????????? *</b>{' '}
                  </p>
                  <Input
                    name="password"
                    type="password"
                    className="Auth-line-of-input"
                    placeholder="Password"
                  />
                  <p>?? ???????? "????????????" ?????????????????????? ??????????????.</p>

                  <Button htmlType="submit" className="Auth-sign-up-butto-two">
                    <p className="Auth-text-button"> ????????</p>
                  </Button>
                </div>
              </form>
            </TabPane>
            <TabPane tab="?????????????????? ????????????" key="3">
              <p className="Auth-paragraph">
                ?????? ???????????????????????? ?????? ?????????? ?????????????????????? ?????????? *:
              </p>
              <Input
                className="Auth-line-of-input"
                placeholder="?????????????? ?????? ?????? ??????????"
              />
              <div>
                <Button className="Auth-sign-up-button">
                  <p className="Auth-text-button "> ??????????????????</p>
                </Button>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </Spin>
  );
};

const mapStateToProps = (state: any) => {
  return {
    token: state.token,
  };
};

export default connect(mapStateToProps, { setToken })(Auth);
