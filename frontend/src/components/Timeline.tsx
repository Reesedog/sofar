import React, { useState, useEffect } from 'react';
import DiaryEntryForm from './DiaryEntryForm';

type EntryType = {
  id: number;
  content: string;
  created_at: string;
};

type GroupedEntries = {
  [date: string]: EntryType[];
};

interface DateCardProps {
  date: string;
  entries: EntryType[];
}

const DateCard: React.FC<DateCardProps> = ({ date, entries }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-4">
      <h2 className="pb-3 text-xl font-bold">{date}</h2>
      <div className="space-y-2">
        {entries.map(entry => (
          <div key={entry.id} className="p-2 bg-gray-200 rounded-md">
            {entry.content}
          </div>
        ))}
      </div>
    </div>
  );
};

const Timeline: React.FC = () => {
  const [entries, setEntries] = useState<EntryType[]>([]);

  const addEntry = (newEntry: EntryType) => {
    setEntries(prevEntries => [newEntry, ...prevEntries]);
  };

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch('http://34.125.177.255:4000/entries');
        if (response.ok) {
          const data = await response.json();
          setEntries(data);
        } else {
          console.error("Error fetching entries:", await response.text());
        }
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchEntries();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://34.125.177.255:4000/entries/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
      } else {
        console.error("Error deleting entry:", await response.text());
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const groupedEntries = entries.reduce<GroupedEntries>((acc, entry) => {
    const date = entry.created_at.split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(entry);
    return acc;
  }, {});


  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">时间线</h1>
      <DiaryEntryForm onAdd={addEntry} />
      {Object.keys(groupedEntries).map(date => (
        <><div><h2 className="text-xl font-bold mb-2 lp-1">{date}</h2></div><div key={date} className="date-card p-4 bg-white rounded-lg shadow-md mb-4">
          {groupedEntries[date].map(entry => (
            <div key={entry.id} className="border-2 border-slate-100 items-center entry p-2 bg-white rounded-lg shadow-lg mb-2 flex justify-between hover:bg-blue-50">
              <span>{entry.content}</span>
              <button onClick={() => handleDelete(entry.id)} className="bg-red-500 text-white px-2 py-1 rounded">删除</button>
            </div>
          ))}
        </div></>
      ))}
    </div>
  );
}

export default Timeline;


// const handleEdit = async (id: number, newContent: string) => {
//     try {
//         const response = await fetch(`http://34.125.177.255:4000/entries/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({ content: newContent }),
//             });
//             if (response.ok) {
//                 const updatedEntry = await response.json();
//                 setEntries(prevEntries =>
//                   prevEntries.map(entry => entry.id === id ? updatedEntry : entry)
//                 );
//               } else {
//                   console.error("Error editing entry:", await response.text());
//     }
//   } catch (error) {
//       console.error("Error editing entry:", error);
//     }
//   };

 