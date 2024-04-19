import { Menu, MenuProps } from 'antd';
import { faCodepen } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faTerminal } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function ServiceLayoutMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnameLength = location.pathname.split('/').length;
  const currentKey = location?.pathname.split('/')[pathnameLength - 1];
  const params = useParams();
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(`/services/${params?.id}/${e?.key}`);
  };

  const items: MenuProps['items'] = [
    {
      key: 'deployments',
      label: 'Deployments',
      icon: <FontAwesomeIcon icon={faCodepen} />
    },
    {
      key: 'logs',
      label: 'Logs',
      icon: <FontAwesomeIcon icon={faTerminal} />
    },
    {
      key: 'configurations',
      label: 'Configuration',
      icon: <FontAwesomeIcon icon={faSliders} />
    }
  ];

  return (
    <Menu
      className={'mr-6 pr-5'}
      style={{ height: '100%' }}
      onClick={onClick}
      selectedKeys={[currentKey]}
      items={items}
    />
  );
}

export default ServiceLayoutMenu;
