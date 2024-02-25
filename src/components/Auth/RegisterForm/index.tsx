import { Button, Checkbox, Divider, Form, Input, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import OAuthServices from '~/components/Auth/OAuthServices';
import { DoRegisterPayload } from '~/types/auth.type';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import usePromise from '~/hooks/usePromise';
import { Status } from '~/enum/app.enum';
import { authService } from '~/services/auth.service';

function RegisterForm() {
  const [form] = Form.useForm();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [isConfirmedPolicy, setIsConfirmedPolicy] = useState(false);
  const [{ status }, doRegister] = usePromise(authService.register);
  const onSubmit = async (payload: DoRegisterPayload) => {
    try {
      if (!isConfirmedPolicy) {
        enqueueSnackbar('You must confirm policy before register account!', { variant: 'error' });
        return;
      }
      await doRegister(payload);
      enqueueSnackbar('Register account successfully!', { variant: 'success' });
      navigate('/auth/login');
    } catch (error: any) {
      enqueueSnackbar(`${error?.response?.data?.message || 'Failed to register account!'}`, { variant: 'error' });
    }
  };

  return (
    <Form form={form} onFinish={onSubmit} className={'w-full'} layout={'vertical'} name='register'>
      <Form.Item
        className={'w-full'}
        name='username'
        rules={[
          {
            required: true,
            message: 'Please enter username!'
          },
          {
            min: 5,
            message: 'Username must have at least 5 characters'
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
        name='confirmPassword'
        dependencies={['password'] as any}
        rules={[
          {
            required: true,
            message: 'Please confirm your password!'
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password' as any) === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The confirm password that you entered do not match!'));
            }
          })
        ]}
      >
        <Input.Password
          prefix={<FontAwesomeIcon icon={faLock} />}
          placeholder='Confirm password'
          autoComplete={'off'}
        />
      </Form.Item>
      <Checkbox
        className={' mb-3'}
        value={isConfirmedPolicy}
        onChange={(event) => {
          setIsConfirmedPolicy(event.target.checked);
        }}
      >
        Agree with Privacy Policy and Terms of Use
      </Checkbox>
      <Form.Item className={'w-full mb-4'}>
        <Button loading={status === Status.PENDING} type='primary' htmlType='submit' block>
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
