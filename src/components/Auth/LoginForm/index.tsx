import { Button, Checkbox, Divider, Form, Input, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import OAuthServices from '~/components/Auth/OAuthServices';
import { DoLoginPayload } from '~/types/auth.type';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '~/redux/store';
import { Status } from '~/enum/app.enum';
import { doLogin } from '~/redux/actions/auth.action';
import { enqueueSnackbar } from 'notistack';

function LoginForm() {
  const [form] = Form.useForm();
  const loginStatus = useAppSelector((state) => state.auth.status);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const usernameRef = useRef<any>();
  const onSubmit = async (payload: DoLoginPayload) => {
    dispatch(doLogin(payload)).then((response: any) => {
      if (response?.meta.requestStatus === 'fulfilled') {
        navigate('/');
      } else {
        enqueueSnackbar('Username or password is not connect!', { variant: 'error' });
      }
    });
  };

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <Form
      form={form}
      className={'w-full'}
      layout={'vertical'}
      name='sign-in'
      onFinish={onSubmit}
      initialValues={{
        username: ''
      }}
    >
      <Form.Item
        className={'w-full'}
        name='loginField'
        rules={[
          {
            required: true,
            message: 'Please enter login field!'
          }
        ]}
      >
        <Input
          prefix={<FontAwesomeIcon icon={faUser} />}
          placeholder='Username or Email'
          autoComplete='nope'
          ref={usernameRef}
        />
      </Form.Item>
      <Form.Item
        className={'w-full'}
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password prefix={<FontAwesomeIcon icon={faLock} />} placeholder='Password' autoComplete={'off'} />
      </Form.Item>
      <div className={'flex justify-between mb-3'}>
        <Checkbox onChange={() => {}}>Remember me</Checkbox>
        <Link to={'#'}>Forgot your password?</Link>
      </div>
      <Form.Item className={'w-full mb-4'}>
        <Button loading={loginStatus === Status.PENDING} type='primary' htmlType='submit' block>
          Login
        </Button>
      </Form.Item>
      <Divider plain>OR</Divider>
      <OAuthServices />
      <div className={'flex justify-center'}>
        <div>
          <Typography.Text>Do not have account?</Typography.Text>
          <Link to={'/auth/register'}>{` Register here`}</Link>
        </div>
      </div>
    </Form>
  );
}

export default LoginForm;
