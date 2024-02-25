import { Button, Card, Col, Divider, Form, Input, Layout, Row, Select, Typography } from 'antd';
import NewFieldItem from '~/components/Services/Web/NewFieldItem';
import { Runtime } from '~/enum/app.enum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

function WebNewPage() {
  const [form] = Form.useForm();
  const runtime = Form.useWatch('runtime', form);

  return (
    <Layout
      style={{
        maxWidth: 1200,
        margin: '0 auto'
      }}
    >
      <div className={'mb-12'}>
        <Typography.Title level={3}>You are deploying a web service for @Repo_Name</Typography.Title>
        <Typography.Text type={'secondary'}>
          You seem to be using Docker, so we’ve autofilled some fields accordingly. Make sure the values look right to
          you!
        </Typography.Text>
      </div>
      <Card bordered={false}>
        <Form form={form} initialValues={{ envVars: [''] }}>
          <Row gutter={[32, 24]}>
            <Col span={24}>
              <Typography.Title className={'mb-0'} level={5}>
                Service Configuration
              </Typography.Title>
            </Col>
            <Col span={8}>
              <NewFieldItem title={'Name'} description={'A unique name for your web service.'} />
            </Col>
            <Col span={16}>
              <Form.Item name={'name'}>
                <Input placeholder={'Service name'} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <NewFieldItem title={'Branch'} description={'The repository branch used for your web service.'} />
            </Col>
            <Col span={16}>
              <Form.Item name={'branch'}>
                <Select
                  defaultValue={'main'}
                  options={[
                    {
                      label: 'main',
                      value: 'main'
                    }
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <NewFieldItem
                isOptional
                title={'Root Directory'}
                description={
                  'Defaults to repository root. When you specify a root directory that is different from your repository root, Render runs all your commands in the specified directory and ignores changes outside the directory.'
                }
              />
            </Col>
            <Col span={16}>
              <Form.Item name={'rootDir'}>
                <Input placeholder={'./'} />
              </Form.Item>
            </Col>
            <Divider className={'my-0'} />
            <Col span={24}>
              <Typography.Title className={'mb-0'} level={5}>
                Build Configuration
              </Typography.Title>
            </Col>
            <Col span={8}>
              <NewFieldItem title={'Runtime'} description={'The runtime for your web service.'} />
            </Col>
            <Col span={16}>
              <Form.Item name={'runtime'}>
                <Select
                  defaultValue={'docker'}
                  options={[
                    {
                      label: 'Docker',
                      value: Runtime.DOCKER
                    },
                    {
                      label: 'Node',
                      value: Runtime.NODE
                    }
                  ]}
                />
              </Form.Item>
            </Col>
            {runtime === Runtime.NODE && (
              <>
                <Col span={8}>
                  <NewFieldItem
                    title={'Build Command'}
                    description={
                      'This command runs in the root directory of your repository when a new version of your code is pushed, or when you deploy manually. It is typically a script that installs libraries, runs migrations, or compiles resources needed by your app'
                    }
                  />
                </Col>
                <Col span={16}>
                  <Form.Item name={'buildCmd'}>
                    <Input
                      prefix={'$'}
                      defaultValue={'yarn --frozen-lockfile install; yarn build'}
                      spellCheck={false}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <NewFieldItem
                    title={'Start Command'}
                    description={
                      'This command runs in the root directory of your app and is responsible for starting its processes. It is typically used to start a webserver for your app. It can access environment variables defined by you in UET hosting.'
                    }
                  />
                </Col>
                <Col span={16}>
                  <Form.Item name={'buildCmd'}>
                    <Input prefix={'$'} defaultValue={'yarn start'} spellCheck={false} />
                  </Form.Item>
                </Col>
              </>
            )}
            <Divider className={'my-0'} />
            <Col span={24}>
              <Typography.Title className={'mb-0'} level={5}>
                Environment Variables
              </Typography.Title>
            </Col>
            <Col span={8}>
              <NewFieldItem
                isOptional
                title={'Environment Variables'}
                description={
                  'Set environment-specific config and secrets (such as API keys), then read those values from your code. '
                }
              />
            </Col>
            <Col span={16}>
              <Form.List name='envVars'>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name }, index) => {
                      return (
                        <div key={key} className={'w-full flex items-center gap-6'}>
                          <Form.Item name={[name, 'key']} className={'flex-grow-1'}>
                            <Input placeholder='Key' />
                          </Form.Item>
                          <Form.Item name={[name, 'value']} className={'flex-grow-1'}>
                            <Input placeholder='Value' />
                          </Form.Item>
                          <Form.Item>
                            {fields.length - 1 === index ? (
                              <Button
                                shape={'circle'}
                                type={'text'}
                                onClick={() => {
                                  add();
                                }}
                              >
                                <FontAwesomeIcon icon={faCirclePlus} size={'xl'} />
                              </Button>
                            ) : (
                              <Button
                                shape={'circle'}
                                type={'text'}
                                onClick={() => {
                                  remove(name);
                                }}
                              >
                                <FontAwesomeIcon icon={faCircleMinus} size={'xl'} />
                              </Button>
                            )}
                          </Form.Item>
                        </div>
                      );
                    })}
                  </>
                )}
              </Form.List>
            </Col>
            <Divider className={'my-0'} />
            <div className={'flex justify-end w-full'}>
              <Button type={'primary'}>Build & Deploy Web Service</Button>
            </div>
          </Row>
        </Form>
      </Card>
    </Layout>
  );
}

export default WebNewPage;