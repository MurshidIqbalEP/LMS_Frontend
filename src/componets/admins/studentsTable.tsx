
import React, { useState } from "react";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import {IEducator, IUser} from "../../services/types"



interface StudentsTableProps {
  data: IUser[]|IEducator[];
  onBlock: (id: string) => void;
  onUnblock: (id: string) => void;
  title?: string;
  searchable?: boolean;
}

const StudentsTable: React.FC<StudentsTableProps> = ({
  data,
  onBlock,
  onUnblock,
  title = "Table",
  searchable = true,
}) => {

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [searchText, setSearchText] = useState("");

  const handleChange: TableProps<IUser>["onChange"] = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
    setSearchText("");
  };

  const filteredData = (data ?? []).filter(
  (user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase())
);


  const columns: TableColumnsType<IUser> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: (sortedInfo as any)?.columnKey === "name" ? (sortedInfo as any)?.order : null,
      ellipsis: true,
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortOrder: (sortedInfo as any)?.columnKey === "email" ? (sortedInfo as any)?.order : null,
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
              onConfirm={() => onBlock(record?._id)}
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

  return (
    <>
      <div
      className="flex justify-between px-2">
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
      <Table
        className="p-4 "
        columns={columns}
        dataSource={filteredData}
        onChange={handleChange}
        bordered
        pagination={{
          position: ["bottomCenter"],
          size: "small",
        }}
      />
    </>
  );
};

export default StudentsTable;
