import { ServiceStatusEnum } from '~/enum/app.enum.ts';
import StageStatus from '~/components/shared/StageStatus';

interface PipelineProps {
  pipeline: ServiceStatusEnum[];
}

function Pipeline(props: PipelineProps) {
  return (
    <div className={'flex items-center'}>
      {props?.pipeline.map((status, index) => {
        const isLastEle = props?.pipeline.length - 1 === index;
        return (
          <div className={'flex items-center'} key={index}>
            <StageStatus status={status} />
            {!isLastEle && <div>-</div>}
          </div>
        );
      })}
    </div>
  );
}

export default Pipeline;
