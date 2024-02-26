import { Alert, Spin } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { jwtService } from '~/services/jwt.service';
import { useSnackbar } from 'notistack';
import { GetAuthUrlOptions, gitlabService } from '~/services/gitlab.service';
import { GitlabKey, GitlabStateAction } from '~/enum/app.enum';
import { useLocalStorage } from '~/hooks/useLocalStorage.ts';
import { GITLAB_REDIRECT_URI } from '~/config/gitlab.config.ts';

function AuthGitlabCallback() {
  const [, setIsConnected] = useLocalStorage(GitlabKey.IS_CONNECTED, false);
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (!code || !state) {
        throw new Error('Action to verify is not valid!');
      }
      const decodedState: GetAuthUrlOptions['state'] = jwtService.decode(state!);
      const actionType = decodedState?.action;
      const redirectPath = decodedState?.redirect_path;

      switch (actionType) {
        case GitlabStateAction.CONNECT: {
          gitlabService.connect({ code, redirect_uri: GITLAB_REDIRECT_URI }).then((response) => {
            console.log({ response });
            setIsConnected(true);
            navigate(redirectPath);
          });
          break;
        }
        case GitlabStateAction.AUTH: {
          console.log('Handle Auth');
          break;
        }
      }
    } catch {
      enqueueSnackbar('Action to verify is not valid!', { variant: 'error' });
    }
  }, []);

  return (
    <Spin>
      <Alert description='Just a second, we are verifying your gitlab authentication.' type='info' />
    </Spin>
  );
}

export default AuthGitlabCallback;
