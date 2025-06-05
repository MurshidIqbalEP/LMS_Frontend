import { blockEducator, fetchEducators, unblockEducator } from '@/api/adminApi';
import StudentsTable from '@/componets/admins/studentsTable';
import { IEducator } from '@/services/types';
import { useEffect, useState } from 'react'
import { toast } from 'sonner';

function EducatorsPage() {
  const [educatore, setEducatore] = useState<IEducator[]>([]);
  useEffect(() => {
    const fetchEducater = async () => {
      try {
        const response = await fetchEducators();   
        setEducatore(response?.data.educators);
      } catch (error) {
        toast.error("Failed to fetch Educator");
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
        toast.success("Educator blocked successfully");
      }
    };
  
    const handleUnblock = async (id: string) => {
      const res = await unblockEducator(id);
      if (res) {
        setEducatore((prev) =>
          prev.map((u) => (u._id === id ? { ...u, isBlocked: false } : u))
        );
        toast.success("Educator unblocked successfully");
      }
    };
    
  return (
    <StudentsTable<IEducator>
      data={educatore}
      onBlock={handleBlock}
      onUnblock={handleUnblock}
      title="Educators"
      searchable={true}
    />
  )
}

export default EducatorsPage