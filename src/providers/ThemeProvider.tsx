import { ConfigProvider, theme } from 'antd';
import { ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider(props: ThemeProviderProps) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorBgContainer: '#121212',
          colorBgBase: '#000',
          colorText: '#ebebeb',
          colorTextSecondary: '#E3E4EB',
          colorSuccess: '#0060C8',
          colorPrimary: '#0060C8',
          colorLink: '#0060C8',
          fontSize: 13,
          colorTextDescription: '#a8a9b2'
        },
        components: {
          Input: {
            colorBorder: '#212226',
            colorTextPlaceholder: '#A8A9B2',
            borderRadius: 12,
            borderRadiusLG: 14,
            controlHeight: 36
          },
          Select: {
            colorTextPlaceholder: '#A8A9B2',
            borderRadius: 12,
            borderRadiusLG: 14,
            controlHeight: 36,
            colorBorder: '#212226'
          },
          DatePicker: {
            colorBgContainer: '#212226',
            colorTextPlaceholder: '#A8A9B2',
            borderRadius: 12,
            borderRadiusLG: 14,
            controlHeight: 36
          },
          Button: {
            primaryColor: '#F6F6FB',
            colorTextLightSolid: '#F6F6FB',
            borderRadius: 12,
            borderRadiusLG: 14,
            controlHeight: 36,
            fontWeight: 500,
            colorBorder: '#212226'
          },
          Dropdown: {
            colorBgElevated: '#212226'
          },
          Popover: {
            colorBgElevated: '#212226'
          },
          Modal: {
            colorBgElevated: '#212226',
            fontSizeHeading5: 16
          },
          Switch: {
            handleSize: 14,
            trackHeight: 18,
            trackMinWidth: 34,
            innerMaxMargin: 24
          },
          Form: {
            marginLG: 16
          },
          Card: {
            borderRadiusLG: 16,
            colorBgContainer: '#0b0b0b'
          },
          Table: {
            headerBg: '#0b0b0b',
            colorBgContainer: '#0b0b0b',
            headerSplitColor: 'transparent',
            controlItemBgActive: '#413E32',
            borderColor: '#212226'
          },
          Tabs: {
            itemSelectedColor: '#ffffff',
            itemHoverColor: '#ccc',
            itemActiveColor: '#ccc'
          },
          Divider: {
            colorSplit: '#212226'
          },
          Menu: {
            colorBgContainer: 'transparent'
          }
        }
      }}
    >
      {props?.children}
    </ConfigProvider>
  );
}
