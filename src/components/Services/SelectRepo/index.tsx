import { Avatar, Button, Card, Col, Divider, Form, Input, List, Row, Select, Space, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGitlab } from '@fortawesome/free-brands-svg-icons';
import { Service, Status } from '~/enum/app.enum.ts';
import { useNavigate } from 'react-router-dom';
import ConnectGitlabButton from '~/components/Services/SelectRepo/ConnectGitlabButton';
import { useEffect } from 'react';
import { useAppSelector } from '~/redux/store';
import { faGlobe, faLock } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const { Search } = Input;

interface SelectRepoProps {
  type: Service;
}

export default function SelectRepo(props: SelectRepoProps) {
  const navigate = useNavigate();
  const isConnectedToGitlab = useAppSelector((state) => state.gitlab.isConnected);
  const gitlabProjects = useAppSelector((state) => state.gitlab.projects.data);
  const loadingGitlabProjectStatus = useAppSelector((state) => state.gitlab.projects.status);
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  useEffect(() => {
    if (isConnectedToGitlab) {
      // gitlabService.getAllProjects();
    }
  }, [isConnectedToGitlab]);

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} lg={16}>
        <Card className={'mb-4 '} bordered={false}>
          <Typography.Title className={'mb-4'} level={5}>
            Connect a repository
          </Typography.Title>
          <Space.Compact className={'w-full flex items-center'}>
            <Form.Item>
              <Select
                style={{ minWidth: 200 }}
                showSearch
                placeholder='Select a git provider'
                optionFilterProp='children'
                onChange={onChange}
                onSearch={onSearch}
                filterOption={filterOption}
                defaultValue={'all'}
                options={[
                  {
                    value: 'all',
                    label: 'All repositories'
                  },
                  {
                    value: 'github',
                    label: 'GitHub repositories'
                  },
                  {
                    value: 'gitlab',
                    label: 'GitLab repositories'
                  }
                ]}
              />
            </Form.Item>
            <Form.Item className={'flex-grow-1'}>
              <Search
                className={'w-full'}
                placeholder='Search repositories...'
                onSearch={onSearch}
                style={{ width: 200 }}
              />
            </Form.Item>
          </Space.Compact>
          <Divider className={'my-3'} />
          <div
            style={{
              maxHeight: 360,
              overflow: 'auto'
            }}
          >
            <List
              loading={loadingGitlabProjectStatus === Status.PENDING}
              itemLayout='horizontal'
              dataSource={gitlabProjects}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      type={'primary'}
                      onClick={async () => {
                        navigate(`/${props?.type}/new?projectID=${item?.id}`);
                      }}
                    >
                      Import
                    </Button>
                  ]}
                >
                  <div className={'flex gap-4 items-center'}>
                    <Avatar
                      shape={'square'}
                      src={item?.avatar_url}
                      icon={item?.avatar_url || <FontAwesomeIcon icon={faGitlab} />}
                    />
                    <Typography.Text ellipsis={true}>{`${item?.namespace?.path} / ${item?.name}`}</Typography.Text>
                    {item?.visibility === 'private' ? (
                      <FontAwesomeIcon icon={faLock} />
                    ) : (
                      <FontAwesomeIcon icon={faGlobe} />
                    )}
                    <Typography.Text type={'secondary'} ellipsis={true}>
                      {dayjs(item?.last_activity_at)?.fromNow()}
                    </Typography.Text>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </Card>
        <Card bordered={false}>
          <Typography.Title className={'mb-4'} level={5}>
            Connect to public git repository
          </Typography.Title>
          <Typography.Text type={'secondary'}>
            Use a public repository by entering the URL below. Features like PR Previews and Auto-Deploy are not
            available if the repository has not been configured for UET Hosting.
          </Typography.Text>
          <Space.Compact className={'w-full mt-6 flex items-center'}>
            <Input placeholder={'https://github.com/uet-hosting-examples/repository-name'} />
            <Button disabled type={'primary'}>
              Import
            </Button>
          </Space.Compact>
        </Card>
      </Col>
      <Col xs={24} lg={8}>
        <Card bordered={false}>
          <Typography.Title className={'mb-4'} level={5}>
            Git provider configuration
          </Typography.Title>
          <div className={'flex flex-col gap-6'}>
            <Button block icon={<FontAwesomeIcon icon={faGithub} />}>
              Connect to Github
            </Button>
            <ConnectGitlabButton />
          </div>
        </Card>
      </Col>
    </Row>
  );
}
