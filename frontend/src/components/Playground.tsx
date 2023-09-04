import React from 'react';
import '../index.css';

type Entry = {
  id: number;
  content: string;
  date: string;
};

type GroupedEntries = {
  [date: string]: Entry[];
};

interface DateCardProps {
  date: string;
  entries: Entry[];
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

const Playground: React.FC = () => {
  const entries: Entry[] = [
    // 示例数据
    { id: 1, content: 'First entry', date: '2023-08-21' },
    { id: 2, content: 'Second entry', date: '2023-08-21' },
    { id: 3, content: 'Third entry', date: '2023-08-22' },
  ];

  const groupedEntries = entries.reduce<GroupedEntries>((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = [];
    }
    acc[entry.date].push(entry);
    return acc;
  }, {});

  return (
    <div className="p-4 bg-gray-100">
      {Object.keys(groupedEntries).map(date => (
        <DateCard key={date} date={date} entries={groupedEntries[date]} />
      ))}
    </div>
  );
};

export default Playground;

// const handleEdit = async (id: number, newContent: string) => {
//     try {
//         const response = await fetch(`http://34.125.11.145:4000/entries/${id}`, {
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
