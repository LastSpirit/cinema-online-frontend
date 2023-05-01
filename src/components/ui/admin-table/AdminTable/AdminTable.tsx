import { FC } from 'react';

import SkeletonLoader from '../../SkeletonLoader';
import styles from './AdminTable.module.scss';
import AdminTableHeader from './AdminTableHeader';
import AdminTableItem from './AdminTableItem';
import { ITableItem } from './admin-table.types';

interface IAdminTable {
	tableItems: ITableItem[];
	headerItems: string[];
	isLoading: boolean;
	removeHandler: (id: number) => void;
}

const AdminTable: FC<IAdminTable> = ({
	tableItems,
	headerItems,
	isLoading,
	removeHandler,
}) => {
	return (
		<div>
			<AdminTableHeader headerItems={headerItems} />

			{isLoading ? (
				<SkeletonLoader count={1} height={48} className="mt-4" />
			) : tableItems.length ? (
				tableItems.map((tableItem) => (
					<AdminTableItem
						key={tableItem.id}
						tableItem={tableItem}
						removeHandler={removeHandler}
					/>
				))
			) : (
				<div className={styles.notFound}>Elements not found</div>
			)}
		</div>
	);
};

export default AdminTable;
