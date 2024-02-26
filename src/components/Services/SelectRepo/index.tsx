import { Avatar, Button, Card, Col, Divider, Form, Input, List, Row, Select, Space, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGitlab } from '@fortawesome/free-brands-svg-icons';
import { Service } from '~/enum/app.enum.ts';
import { useNavigate } from 'react-router-dom';
import ConnectGitlabButton from '~/components/Services/SelectRepo/ConnectGitlabButton';
import { useEffect } from 'react';
import { gitlabService } from '~/services/gitlab.service.ts';
import { useAppSelector } from '~/redux/store';

const { Search } = Input;

interface SelectRepoProps {
  type: Service;
}

export default function SelectRepo(props: SelectRepoProps) {
  const navigate = useNavigate();
  const isConnectedToGitlab = useAppSelector((state) => state.gitlab.isConnected);
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const data = [
    {
      title: 'Git repository 1'
    },
    {
      title: 'Git repository 2'
    },
    {
      title: 'Git repository 3'
    },
    {
      title: 'Git repository 4'
    },
    {
      title: 'Git repository 5'
    },
    {
      title: 'Git repository 6'
    },
    {
      title: 'Git repository 7'
    },
    {
      title: 'Git repository 8'
    }
  ];

  useEffect(() => {
    if (isConnectedToGitlab) {
      gitlabService.getAllProjects();
    }
  }, [isConnectedToGitlab]);

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={16}>
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
              height: 360,
              overflow: 'auto'
            }}
          >
            <List
              itemLayout='horizontal'
              dataSource={data}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      type={'primary'}
                      onClick={() => {
                        navigate(`/${props?.type}/new`);
                      }}
                    >
                      Import
                    </Button>
                  ]}
                >
                  <div className={'flex gap-4 items-center'}>
                    <Avatar shape={'square'} icon={<FontAwesomeIcon icon={faGitlab} />} />
                    <Typography>{item?.title}</Typography>
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
            available if the repository has not been configured for Render.
          </Typography.Text>
          <Space.Compact className={'w-full mt-6 flex items-center'}>
            <Input placeholder={'https://github.com/uet-hosting-examples/repository-name'} />
            <Button disabled type={'primary'}>
              Import
            </Button>
          </Space.Compact>
        </Card>
      </Col>
      <Col xs={24} md={8}>
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
