import { Button, Card, Col, Divider, Form, Input, Layout, Row, Select, Typography } from 'antd';
import { Runtime } from '~/enum/app.enum.ts';
import NewFieldItem from '~/components/Services/Web/NewFieldItem';
import { faArrowRight, faCube } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function WebDeployPage() {
  const [form] = Form.useForm();

  return (
    <Layout
      style={{
        maxWidth: 992,
        margin: '0 auto'
      }}
    >
      <div className={'mb-12'}>
        <Typography.Title level={3}>Create a new Web Service</Typography.Title>
        <Typography.Text type={'secondary'}>
          Deploy your web service from an image hosted on a public or private registry.
        </Typography.Text>
      </div>
      <Card bordered={false}>
        <Form form={form} initialValues={{ envVars: [''], runtime: Runtime.NODE }}>
          <Row gutter={[32, 24]}>
            <Col span={24}>
              <Typography.Title className={'mb-0'} level={5}>
                Deploy an image
              </Typography.Title>
            </Col>
            <Col span={8}>
              <NewFieldItem title={'Image URL'} description={'The image URL for your external image.'} />
            </Col>
            <Col span={16}>
              <Form.Item name={'imageUrl'}>
                <Input prefix={<FontAwesomeIcon icon={faCube} />} placeholder={'docker.io/library/nginx:latest'} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <NewFieldItem
                title={'Credential'}
                isOptional
                description={'Use a credential to access private images. Manage credentials in Settings.'}
              />
            </Col>
            <Col span={16}>
              <Form.Item name={'imageUrl'}>
                <Select placeholder={'No credential'} />
              </Form.Item>
            </Col>
            <Divider className={'my-0'} />
            <Col span={24} className={'flex justify-end '}>
              <Button type={'primary'} icon={<FontAwesomeIcon icon={faArrowRight} />}>
                Continue
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Layout>
  );
}

export default WebDeployPage;
