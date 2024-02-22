import { Button, Checkbox, Divider, Form, Input, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import OAuthServices from '~/components/Auth/OAuthServices';

function LoginForm() {
  return (
    <Form className={'w-full'} layout={'vertical'} name='sign-in'>
      <Form.Item
        className={'w-full'}
        name='email'
        rules={[
          {
            required: true,
            message: 'Please enter login field!'
          }
        ]}
      >
        <Input prefix={<FontAwesomeIcon icon={faUser} />} placeholder='Username or Email' autoComplete='username' />
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
        <Button loading={false} type='primary' htmlType='submit' block>
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
