import { Button, Card, Form, Layout, Radio, RadioChangeEvent, Space, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WebCreatePage() {
  const [option, setOption] = useState('/web/select-repo');
  const navigate = useNavigate();

  return (
    <Layout
      style={{
        maxWidth: 768,
        margin: '0 auto'
      }}
    >
      <div className={'text-center mb-12'}>
        <Typography.Title level={3}>Create a new Web Service</Typography.Title>
        <Typography.Text type={'secondary'}>Connect a Git repository, or use an existing image.</Typography.Text>
      </div>
      <Typography.Title className={'mb-4'} level={4}>
        How would you like to deploy your web service?
      </Typography.Title>

      <Form.Item className={'w-full'}>
        <Radio.Group
          size={'large'}
          className={'w-full'}
          buttonStyle='solid'
          value={option}
          onChange={(e: RadioChangeEvent) => {
            setOption(e.target.value);
          }}
        >
          <Space direction='vertical' className={'w-full'}>
            <Form.Item>
              <Card bordered={false} className={'w-full'} styles={{ body: { padding: 0 } }}>
                <Radio className={'w-full'} style={{ padding: 24 }} value={'/web/select-repo'}>
                  Build and deploy from a Git repository
                </Radio>
              </Card>
            </Form.Item>
            <Form.Item>
              <Card bordered={false} className={'w-full'} styles={{ body: { padding: 0 } }}>
                <Radio disabled={true} className={'w-full'} style={{ padding: 24 }} value={'/web/deploy'}>
                  Deploy an existing image from a registry
                </Radio>
              </Card>
            </Form.Item>
          </Space>
        </Radio.Group>
      </Form.Item>
      <Button
        type={'primary'}
        icon={<FontAwesomeIcon icon={faArrowRight} />}
        onClick={() => {
          navigate(option);
        }}
      >
        Continue
      </Button>
    </Layout>
  );
}

export default WebCreatePage;
