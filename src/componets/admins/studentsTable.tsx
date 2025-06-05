import  { useState } from "react";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { IEducator, IUser } from "../../services/types";

interface BaseTableProps<T> {
  data: T[];
  onBlock: (id: string) => void;
  onUnblock: (id: string) => void;
  title?: string;
  searchable?: boolean;
}

function StudentsTable<T extends IUser | IEducator>({
  data,
  onBlock,
  onUnblock,
  title = "Table",
  searchable = true,
}: BaseTableProps<T>) {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [searchText, setSearchText] = useState("");

  const handleChange: TableProps<T>["onChange"] = (filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
    setSearchText("");
  };

  // Filter data based on name or email
  const filteredData = (data ?? []).filter((item) => {
    const name = (item as any).name ?? "";
    const email = (item as any).email ?? "";
    return (
      name.toLowerCase().includes(searchText.toLowerCase()) ||
      email.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  // Define columns for IUser
  const userColumns: TableColumnsType<IUser> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder:
        (sortedInfo as any)?.columnKey === "name" ? (sortedInfo as any)?.order : null,
      ellipsis: true,
      filteredValue: (filteredInfo as any)?.name || null,
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortOrder:
        (sortedInfo as any)?.columnKey === "email" ? (sortedInfo as any)?.order : null,
      ellipsis: true,
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record.isBlocked ? (
            <Popconfirm
              title="Unblock this user?"
              onConfirm={() => onUnblock(record._id)}
              overlayStyle={{ width: 250 }}
            >
              <Button type="link">Unblock</Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Block this user?"
              onConfirm={() => onBlock(record._id)}
              overlayStyle={{ width: 250 }}
            >
              <Button type="link">Block</Button>
            </Popconfirm>
          )}
        </Space>
      ),
      align: "center",
    },
  ];

  const educatorColumns: TableColumnsType<IEducator> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder:
        (sortedInfo as any)?.columnKey === "name" ? (sortedInfo as any)?.order : null,
      ellipsis: true,
      filteredValue: (filteredInfo as any)?.name || null,
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => (a.email ?? "").localeCompare(b.email ?? ""),
      sortOrder:
        (sortedInfo as any)?.columnKey === "email" ? (sortedInfo as any)?.order : null,
      ellipsis: true,
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record.isBlocked ? (
            <Popconfirm
              title="Unblock this educator?"
              onConfirm={() => onUnblock(record._id)}
              overlayStyle={{ width: 250 }}
            >
              <Button type="link">Unblock</Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Block this educator?"
              onConfirm={() => onBlock(record._id)}
              overlayStyle={{ width: 250 }}
            >
              <Button type="link">Block</Button>
            </Popconfirm>
          )}
        </Space>
      ),
      align: "center",
    },
  ];

  const columns = data.length > 0 && "isAdmin" in data[0] ? userColumns : educatorColumns;

  return (
    <>
      <div className="flex justify-between px-2">
        <h1 className="text-lg font-bold ml-2 ">{title}</h1>
        {searchable && (
          <Space>
            <Input
              placeholder="Search by name or email"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 200 }}
            />
            <Button onClick={clearAll}>Clear</Button>
          </Space>
        )}
      </div>
      <Table<T>
        className="p-4"
        columns={columns as TableColumnsType<T>}
        dataSource={filteredData}
        onChange={handleChange}
        bordered
        pagination={{
          position: ["bottomCenter"],
          size: "small",
        }}
        rowKey={(record) => record._id}
      />
    </>
  );
}

export default StudentsTable;
