import { Dropdown } from 'antd'
import { DropdownButtonProps } from 'antd/lib/dropdown';
import styles from './index.module.scss'

declare type OverlayFunc = () => React.ReactNode;

export interface HeaderDropdownProps extends Omit<DropdownButtonProps, 'overlay'> {
    overlayClassName?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    overlay: React.ReactNode | OverlayFunc | any;
    placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
}

// eslint-disable-next-line react/prop-types
const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ overlayClassName: cls, ...restProps }) => (
    <Dropdown overlayClassName={`${styles.container} ${cls}`} {...restProps} />
);

export default HeaderDropdown
