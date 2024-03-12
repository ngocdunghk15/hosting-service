import { Layout, Typography } from 'antd';
import SelectRepo from '~/components/Services/SelectRepo';
import { ServiceType } from '~/enum/app.enum.ts';

function WebSelectRepoPage() {
  return (
    <Layout
      style={{
        maxWidth: 1200,
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
    >
      <div className={'mb-10'}>
        <Typography.Title level={3}>Create a new Web Service</Typography.Title>
        <Typography.Text type={'secondary'}>To deploy a new Project, import an existing Git Repository</Typography.Text>
      </div>
      <SelectRepo type={ServiceType.WEB_SERVICE} />
    </Layout>
  );
}

export default WebSelectRepoPage;
