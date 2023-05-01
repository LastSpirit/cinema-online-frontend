import { ChangeEvent, FC } from 'react';

import SearchField from '../../search-field/SearchField';
import AdminCreateButton from './AdminCreateButton';
import styles from './AdminHeader.module.scss';

interface IAdminHeader {
	onClick?: () => void;
	searchTerm: string;
	handleSerch: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AdminHeader: FC<IAdminHeader> = ({
	onClick,
	searchTerm,
	handleSerch,
}) => {
	return (
		<div className={styles.header}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSerch} />
			{onClick && <AdminCreateButton onClick={onClick} />}
		</div>
	);
};

export default AdminHeader;
