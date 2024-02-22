import { Button, Checkbox, Divider, Form, Input, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faGithub, faGitlab, faGoogle } from '@fortawesome/free-brands-svg-icons';

function LoginForm() {
  return (
    <Form className={'w-full'} layout={'vertical'} name='sign-in'>
      <Form.Item
        className={'w-full'}
        name='email'
        rules={[
          {
            required: true,
            type: 'email',
            message: 'The input is not valid E-mail!'
          }
        ]}
      >
        <Input prefix={<FontAwesomeIcon icon={faUser} />} placeholder='Username...' autoComplete='username' />
      </Form.Item>
      <Form.Item
        className={'w-full'}
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password prefix={<FontAwesomeIcon icon={faLock} />} placeholder='Password...' autoComplete={'off'} />
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
      <Form.Item>
        <Button block icon={<FontAwesomeIcon icon={faGithub} />}>
          Continue with Git
        </Button>
      </Form.Item>
      <Form.Item>
        <Button block icon={<FontAwesomeIcon icon={faGitlab} />}>
          Continue with Gitlab
        </Button>
      </Form.Item>
      <Form.Item>
        <Button block icon={<FontAwesomeIcon icon={faGoogle} />}>
          Continue with Google
        </Button>
      </Form.Item>
      <div className={'flex justify-center'}>
        <div>
          <Typography.Text>Do not have account?</Typography.Text>
          <Link to={'#'}>{` Register here`}</Link>
        </div>
      </div>
    </Form>
  );
}

export default LoginForm;
