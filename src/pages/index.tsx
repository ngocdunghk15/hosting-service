import {Button, Dropdown, Input, Layout, Select, Table, Typography} from 'antd';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGlobe, faLaptop, faMagnifyingGlass, faPlus} from '@fortawesome/free-solid-svg-icons';

export default function HomePage() {
  return (
    <Layout>
      <div className={'mb-12'}>
        <Typography.Title level={3}>Services overview</Typography.Title>
        <Typography.Text type={'secondary'}>Manage all your services here.</Typography.Text>
      </div>
      <div className={'flex  gap-8 mb-6'}>
        <Input
          prefix={<FontAwesomeIcon icon={faMagnifyingGlass}/>}
          className={'flex-grow-1'}
          placeholder={'Search services...'}
        />
        <Select
          defaultValue={'sort-by-activity' as any}
          style={{width: 240}}
          options={
            [
              {
                value: 'sort-by-activity',
                label: 'Sort by activity'
              },
              {
                value: 'sort-by-name',
                label: 'Sort by name'
              }
            ] as any
          }
        />
        <Dropdown
          trigger={['click']}
          menu={{
            items: [
              {
                key: 'static-site',
                label: 'Static site',
                icon: <FontAwesomeIcon icon={faLaptop}/>
              },
              {
                key: 'web-service',
                label: 'Web service',
                icon: <FontAwesomeIcon icon={faGlobe}/>
              }
            ]
          }}
        >
          <Button icon={<FontAwesomeIcon icon={faPlus}/>} type={'primary'}>
            Create new service
          </Button>
        </Dropdown>
      </div>
      <Table/>
    </Layout>
  );
}
