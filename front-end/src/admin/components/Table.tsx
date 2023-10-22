/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";

const TableAdmin = ({
    columns,
    data,
    pagination,
}: {
    columns: ColumnsType<any>;
    data: any;
    pagination?: false | TablePaginationConfig | undefined;
}) => <Table columns={columns} dataSource={data} pagination={pagination} />;

export default TableAdmin;
