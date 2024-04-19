import { useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Button, Input, message, Table, TableProps, Tag, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '~/redux/store.ts';
import { loadServiceHistories } from '~/redux/actions/services.action.ts';
import { ServiceHistory } from '~/types/service.type.ts';
import { ServiceStatusEnum, Status } from '~/enum/app.enum.ts';
import Pipeline from '~/components/shared/Pipeline';
import { servicesService } from '~/services/services.service.ts';

function ServicePage() {
  const isFirstLoad = useRef(true);
  const loadServiceHistoriesStatus = useAppSelector((state) => state.services.currentService.histories.status);
  const serviceHistories = useAppSelector((state) => state.services.currentService.histories.data);
  const params = useParams();
  const id = params?.id;
  const dispatch = useAppDispatch();
  const service = useAppSelector((state) => state.services.currentService.data);

  const columns: TableProps<ServiceHistory>['columns'] = [
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'deployStatus',
      render: (status) => {
        switch (status) {
          case ServiceStatusEnum.SUCCESS: {
            return <Tag color={'green'}>Passed</Tag>;
          }
          case ServiceStatusEnum.FAILED: {
            return <Tag color='red'>Failed</Tag>;
          }
          default: {
            return <Tag color={'gold'}>Pending</Tag>;
          }
        }
      }
    },
    {
      key: 'pipeline',
      title: 'Pipeline',
      render: (_, record) => {
        // const pushStatus =
        //   record?.buildStatus === ServiceStatusEnum.SUCCESS
        //     ? record?.deployStatus === ServiceStatusEnum.WAIT
        //       ? ServiceStatusEnum.PENDING
        //       : ServiceStatusEnum.SUCCESS
        //     : record?.buildStatus === ServiceStatusEnum.FAILED
        //       ? ServiceStatusEnum.FAILED
        //       : ServiceStatusEnum.WAIT;
        return <Pipeline pipeline={[record?.buildStatus, record?.deployStatus]} />;
      }
    },
    {
      key: 'updatedAt',
      title: 'Last updated',
      dataIndex: 'updatedAt',
      render: (date) => <Typography>{new Date(date).toLocaleString()}</Typography>
    }
  ];

  const onRetry = async () => {
    try {
      await servicesService.retry(service?._id);
      if (id) {
        dispatch(loadServiceHistories(id)).then(() => {
          message.info('Retrying to deploy this service...');
        });
      }
    } catch {
      message.error('Failed to re-deploy service!');
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(loadServiceHistories(id)).finally(() => {
        isFirstLoad.current = false;
      });
    }

    const timer = setInterval(() => {
      if (id) {
        dispatch(loadServiceHistories(id));
      }
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <div className={'flex gap-4 mb-6 justify-between'}>
        <Input
          style={{ maxWidth: 320 }}
          disabled={true}
          prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />}
          placeholder={'Search deployments...'}
        />
        <div className={'flex items-center gap-4'}>
          {service?.status === 'failed' && (
            <Button icon={<FontAwesomeIcon icon={faRotateRight} />} onClick={onRetry}>
              Retry
            </Button>
          )}
        </div>
      </div>
      <Table
        loading={loadServiceHistoriesStatus === Status.PENDING && isFirstLoad.current}
        columns={columns}
        dataSource={serviceHistories}
        pagination={{
          pageSize: 10
        }}
      />
    </div>
  );
}

export default ServicePage;
