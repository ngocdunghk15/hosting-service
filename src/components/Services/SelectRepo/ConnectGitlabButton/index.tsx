import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGitlab } from '@fortawesome/free-brands-svg-icons';
import { GetAuthUrlOptions, gitlabService } from '~/services/gitlab.service.ts';
import { GITLAB_REDIRECT_URI, VITE_GITLAB_CLIENT_ID } from '~/config/gitlab.config.ts';
import { GitlabStateAction, Status } from '~/enum/app.enum.ts';
import { useAppSelector } from '~/redux/store';

function ConnectGitlabButton() {
  const isConnected = useAppSelector((state) => state.gitlab.isConnected);
  const loadingAccountStatus = useAppSelector((state) => state.gitlab.account.status);
  return (
    <Button
      loading={loadingAccountStatus === Status.PENDING}
      danger={isConnected}
      block
      icon={<FontAwesomeIcon icon={faGitlab} />}
      onClick={() => {
        if (!isConnected) {
          // Handle connect to gitlab
          const options: GetAuthUrlOptions = {
            client_id: VITE_GITLAB_CLIENT_ID,
            redirect_uri: GITLAB_REDIRECT_URI,
            scope: 'read_user api write_repository read_repository',
            state: {
              action: GitlabStateAction.CONNECT,
              redirect_path: '/web/select-repo'
            }
          };
          window.location.href = gitlabService.getAuthorizationUrl(options);
        }
      }}
    >
      {`${isConnected ? 'Disconnect' : 'Connect'}`} to Gitlab
    </Button>
  );
}

export default ConnectGitlabButton;
