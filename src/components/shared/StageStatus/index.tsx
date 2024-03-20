import { ServiceStatusEnum } from '~/enum/app.enum.ts';
import FailedCircle from '~/components/shared/StageStatus/FailedCircle';
import PendingCircle from '~/components/shared/StageStatus/PendingCircle';
// import WaitCircle from '~/components/shared/StageStatus/WaitCircle';
import SuccessCircle from '~/components/shared/StageStatus/SucessCircle';

interface StageStatusProps {
  status: ServiceStatusEnum;
}

function StageStatus(props: StageStatusProps) {
  switch (props?.status) {
    case ServiceStatusEnum.SUCCESS: {
      return (
        <div>
          <SuccessCircle />
        </div>
      );
    }
    case ServiceStatusEnum.PENDING: {
      return (
        <div>
          <PendingCircle />
        </div>
      );
    }
    case ServiceStatusEnum.FAILED: {
      return (
        <div>
          <FailedCircle />
        </div>
      );
    }
    default: {
      return (
        <div>
          <PendingCircle />
        </div>
      );
    }
  }
}

export default StageStatus;
