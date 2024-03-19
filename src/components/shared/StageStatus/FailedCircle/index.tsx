import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function FailedCircle() {
  return <FontAwesomeIcon icon={faCircleXmark} color={'#f57f6c'} size={'xl'} />;
}

export default FailedCircle;
