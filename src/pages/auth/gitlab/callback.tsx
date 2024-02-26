import { Alert, Spin } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { jwtService } from '~/services/jwt.service';
import { useSnackbar } from 'notistack';
import { GetAuthUrlOptions, gitlabService } from '~/services/gitlab.service';
import { GitlabStateAction } from '~/enum/app.enum';

function AuthGitlabCallback() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    try {
      if (!code || !state) {
        throw new Error('Action to verify is not valid!');
      }
      const decodedState: GetAuthUrlOptions['state'] = jwtService.decode(state!);
      const actionType = decodedState?.action;
      switch (actionType) {
        case GitlabStateAction.CONNECT: {
          gitlabService.connect({ code }).then((response) => {
            console.log({ response });
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
  }, [code, state]);

  return (
    <Spin>
      <Alert description='Just a second, we are verifying your gitlab authentication.' type='info' />
    </Spin>
  );
}

export default AuthGitlabCallback;