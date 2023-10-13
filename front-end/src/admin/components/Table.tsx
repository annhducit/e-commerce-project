/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

const TableAdmin = ({
    columns,
    data,
}: {
    columns: ColumnsType<any>;
    data: unknown[];
}) => <Table columns={columns} dataSource={data} />;

export default TableAdmin;
