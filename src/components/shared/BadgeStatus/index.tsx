import { ServiceStatusEnum } from '~/enum/app.enum.ts';
import { Badge } from 'antd';

interface BadgeStatusProps {
  status: ServiceStatusEnum;
}

function BadgeStatus(props: BadgeStatusProps) {
  switch (props?.status) {
    case ServiceStatusEnum.SUCCESS: {
      return (
        <div>
          <Badge color={'green'} text='Ready' />
        </div>
      );
    }
    case ServiceStatusEnum.PENDING: {
      return (
        <div>
          <Badge status='processing' text='Processing' />
        </div>
      );
    }
    case ServiceStatusEnum.FAILED: {
      return (
        <div>
          <Badge status='error' text='Failed' />
        </div>
      );
    }
    default: {
      return (
        <div>
          <Badge status='default' text='Idle' />
        </div>
      );
    }
  }
}

export default BadgeStatus;
