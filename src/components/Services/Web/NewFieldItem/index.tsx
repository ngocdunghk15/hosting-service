import { Typography } from 'antd';

interface NewFieldItemProps {
  title: string;
  description: string;
  isOptional?: boolean;
}

function NewFieldItem(props: NewFieldItemProps) {
  return (
    <div>
      <div className={'flex gap-4 items-center mb-1'}>
        <Typography.Paragraph className={'mb-0'}>{props?.title} </Typography.Paragraph>
        <Typography.Text type={'secondary'}>{props?.isOptional && '(Optional)'}</Typography.Text>
      </div>
      <Typography.Text type={'secondary'}>{props?.description}</Typography.Text>
    </div>
  );
}

export default NewFieldItem;
