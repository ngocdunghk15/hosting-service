import { Button, Card, Form, Layout, Radio, RadioChangeEvent, Space, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function WebCreatePage() {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <Layout
      style={{
        maxWidth: 768,
        marginLeft: 'auto',
        marginRight: 'auto'
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
        <Radio.Group size={'large'} className={'w-full'} buttonStyle='solid' value={value} onChange={onChange}>
          <Space direction='vertical' className={'w-full'}>
            <Form.Item>
              <Card bordered={false} className={'w-full'} bodyStyle={{ padding: 0 }}>
                <Radio className={'w-full'} style={{ padding: 24 }} value={1}>
                  Build and deploy from a Git repository
                </Radio>
              </Card>
            </Form.Item>
            <Form.Item>
              <Card bordered={false} className={'w-full'} bodyStyle={{ padding: 0 }}>
                <Radio className={'w-full'} style={{ padding: 24 }} value={2}>
                  Deploy an existing image from a registry
                </Radio>
              </Card>
            </Form.Item>
          </Space>
        </Radio.Group>
      </Form.Item>
      <Button type={'primary'} icon={<FontAwesomeIcon icon={faArrowRight} />}>
        Continue
      </Button>
    </Layout>
  );
}

export default WebCreatePage;
