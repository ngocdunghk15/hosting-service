import { Button, Form } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import LoginGitlabButton from '~/components/Auth/OAuthServices/LoginGitlabButton';

function OAuthServices() {
  return (
    <div>
      <Form.Item>
        <Button block icon={<FontAwesomeIcon icon={faGithub} />}>
          Continue with Git
        </Button>
      </Form.Item>
      <Form.Item>
        <LoginGitlabButton />
      </Form.Item>
      <Form.Item>
        <Button block icon={<FontAwesomeIcon icon={faGoogle} />}>
          Continue with Google
        </Button>
      </Form.Item>
    </div>
  );
}

export default OAuthServices;
