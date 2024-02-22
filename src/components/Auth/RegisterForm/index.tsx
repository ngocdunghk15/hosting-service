import { Button, Checkbox, Divider, Form, Input, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import OAuthServices from '~/components/Auth/OAuthServices';

function RegisterForm() {
  return (
    <Form className={'w-full'} layout={'vertical'} name='sign-in'>
      <Form.Item
        className={'w-full'}
        name='username'
        rules={[
          {
            required: true,
            message: 'Please enter username!'
          }
        ]}
      >
        <Input prefix={<FontAwesomeIcon icon={faUser} />} placeholder='Username' autoComplete='username' />
      </Form.Item>
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
        <Input prefix={<FontAwesomeIcon icon={faEnvelope} />} placeholder='Email' autoComplete='username' />
      </Form.Item>
      <Form.Item
        className={'w-full'}
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password prefix={<FontAwesomeIcon icon={faLock} />} placeholder='Password' autoComplete={'off'} />
      </Form.Item>
      <Form.Item
        className={'w-full'}
        name='confirmPassword'
        rules={[{ required: true, message: 'Please confirm your password!' }]}
      >
        <Input.Password
          prefix={<FontAwesomeIcon icon={faLock} />}
          placeholder='Confirm password'
          autoComplete={'off'}
        />
      </Form.Item>
      <Checkbox className={' mb-3'} onChange={() => {}}>
        Agree with Privacy Policy and Terms of Use
      </Checkbox>
      <Form.Item className={'w-full mb-4'}>
        <Button loading={false} type='primary' htmlType='submit' block>
          Register
        </Button>
      </Form.Item>
      <Divider plain>OR</Divider>
      <OAuthServices />
      <div className={'flex justify-center'}>
        <div>
          <Typography.Text>Already have an account?</Typography.Text>
          <Link to={'/auth/login'}>{` Login here`}</Link>
        </div>
      </div>
    </Form>
  );
}

export default RegisterForm;
