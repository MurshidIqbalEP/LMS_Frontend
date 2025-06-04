import { blockEducator, fetchEducators, unblockEducator } from '@/api/adminApi';
import StudentsTable from '@/componets/admins/studentsTable';
import { IEducator } from '@/services/types';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

function EducatorsPage() {
  const [educatore, setEducatore] = useState<IEducator[]>([]);
  useEffect(() => {
    const fetchEducater = async () => {
      try {
        const response = await fetchEducators();   
        setEducatore(response?.data.educators);
      } catch (error) {
        toast.error("Failed to fetch users");
      }
    };

    fetchEducater();
  }, []);

  const handleBlock = async (id: string) => {
      const res = await blockEducator(id);
      if (res) {
        setEducatore((prev) =>
          prev.map((u) => (u._id === id ? { ...u, isBlocked: true } : u))
        );
        toast.success("User blocked successfully");
      }
    };
  
    const handleUnblock = async (id: string) => {
      const res = await unblockEducator(id);
      if (res) {
        setEducatore((prev) =>
          prev.map((u) => (u._id === id ? { ...u, isBlocked: false } : u))
        );
        toast.success("User unblocked successfully");
      }
    };
    
  return (
    <StudentsTable
      data={educatore}
      onBlock={handleBlock}
      onUnblock={handleUnblock}
      title="Educators"
      searchable={true}
    />
  )
}

export default EducatorsPage