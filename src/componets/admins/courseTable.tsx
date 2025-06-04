import React, { useState } from "react";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { ICourse } from "../../services/types";

interface CourseTableProps {
  data: ICourse[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onView: (course: ICourse) => void;
  title?: string;
  searchable?: boolean;
}

const CourseTable: React.FC<CourseTableProps> = ({
  data,
  onApprove,
  onReject,
  onView,
  title = "Courses",
  searchable = true,
}) => {

    
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [searchText, setSearchText] = useState("");

  const handleChange: TableProps<ICourse>["onChange"] = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
    setSearchText("");
  };

  // ✅ Updated filter logic: course title or educator name
  const filteredData = (data ?? []).filter(
    (course) =>
      course.title.toLowerCase().includes(searchText.toLowerCase()) ||
      course.educatorId.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // ✅ Updated columns
  const columns: TableColumnsType<ICourse> = [
    {
      title: "Course Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortOrder: (sortedInfo as any)?.columnKey === "title" ? (sortedInfo as any)?.order : null,
      ellipsis: true,
      align: "center",
    },
    {
      title: "Educator",
      key: "educator",
      render: (_, record) => record.educatorId?.name || "N/A",
      sorter: (a, b) => a.educatorId?.name.localeCompare(b.educatorId?.name),
      sortOrder: (sortedInfo as any)?.columnKey === "educator" ? (sortedInfo as any)?.order : null,
      ellipsis: true,
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Approve this course?"
            onConfirm={() => onApprove(record._id!)}
          >
            <Button type="link" className="text-green-600">Approve</Button>
          </Popconfirm>

          <Popconfirm
            title="Reject this course?"
            onConfirm={() => onReject(record._id!)}
          >
            <Button type="link" className="text-red-600">Reject</Button>
          </Popconfirm>

          <Button type="link" onClick={()=>onView(record)}>View</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between px-2 mb-4">
        <h1 className="text-lg font-bold">{title}</h1>
        {searchable && (
          <Space>
            <Input
              placeholder="Search by course or educator"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 250 }}
            />
            <Button onClick={clearAll}>Clear</Button>
          </Space>
        )}
      </div>

      <Table
        className="p-4"
        columns={columns}
        dataSource={filteredData}
        onChange={handleChange}
        rowKey="_id"
        bordered
        pagination={{ position: ["bottomCenter"], size: "small" }}
      />
    </>
  );
};

export default CourseTable;
