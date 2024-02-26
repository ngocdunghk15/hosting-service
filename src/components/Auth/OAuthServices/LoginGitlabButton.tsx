import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGitlab } from '@fortawesome/free-brands-svg-icons';
import { GetAuthUrlOptions, gitlabService } from '~/services/gitlab.service';
import { VITE_GITLAB_CLIENT_ID, GITLAB_REDIRECT_URI } from '~/config/gitlab.config';
import { GitlabStateAction } from '~/enum/app.enum';

function LoginGitlabButton() {
  return (
    <Button
      block
      icon={<FontAwesomeIcon icon={faGitlab} />}
      onClick={() => {
        const options: GetAuthUrlOptions = {
          client_id: VITE_GITLAB_CLIENT_ID,
          redirect_uri: GITLAB_REDIRECT_URI,
          scope: 'read_user api write_repository read_repository',
          state: {
            action: GitlabStateAction.CONNECT
          }
        };
        window.location.href = gitlabService.getAuthorizationUrl(options);
      }}
    >
      Continue with Gitlab
    </Button>
  );
}

export default LoginGitlabButton;