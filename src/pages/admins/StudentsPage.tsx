import { useEffect, useState } from "react";
import StudentsTable from "../../componets/admins/studentsTable";
import { fetchStudents, blockStudent, unblockStudent } from "../../api/adminApi";
import { toast } from "sonner";
import { IUser } from "@/services/types";


function StudentsPage() {
   const [users, setUsers] = useState<IUser[]>([]);

   useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchStudents();   
        setUsers(response?.data.users);
      } catch (error) {
        toast.error("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  const handleBlock = async (id: string) => {
    const res = await blockStudent(id);
    if (res) {
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, isBlocked: true } : u))
      );
      toast.success("User blocked successfully");
    }
  };

  const handleUnblock = async (id: string) => {
    const res = await unblockStudent(id);
    if (res) {
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, isBlocked: false } : u))
      );
      toast.success("User unblocked successfully");
    }
  };

  return (
    <StudentsTable<IUser>
      data={users}
      onBlock={handleBlock}
      onUnblock={handleUnblock}
      title="Students"
      searchable={true}
    />
  )
}

export default StudentsPage