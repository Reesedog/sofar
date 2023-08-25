import React, { useState, useEffect } from 'react';
import DiaryEntryForm from './DiaryEntryForm';
import { EntryType } from './DiaryEntryForm';

type GroupedEntries = {
  [date: string]: LabelGroupedEntries;
};

type LabelGroupedEntries = {
  [label: string]: EntryType[];
};

interface DateCardProps {
  entries: GroupedEntries;
}

const Timeline: React.FC = () => {

  const DateCard: React.FC<DateCardProps> = (entries) => {
    return (
      <>
        {Object.keys(groupedEntries).map(date => (
          <div key={date} className="mb-4">
            <h2 className="text-xl font-bold mb-2 lp-1">{date}</h2>
            <div className="overflow-x-auto whitespace-nowrap flex  space-x-4">
              {Object.keys(groupedEntries[date]).map(label => (
                <div key={label}
                  style={{ width: Object.keys(groupedEntries[date]).length > 3 ? '31%' : `${100 / Object.keys(groupedEntries[date]).length}%` }}
                  className={`mb-4 ${Object.keys(groupedEntries[date]).length > 3 ? 'flex-none' : ''}`}>
                  <div className="p-4 bg-white rounded-lg shadow-md overflow-x-auto whitespace-nowrap">
                    <h3 className="text-lg font-semibold mb-1">{label}</h3>
                    {groupedEntries[date][label].map(entry => (
                      <div key={entry.id} className="border-2 border-slate-100 items-center entry p-2 bg-white rounded-lg shadow-lg mb-2 flex justify-between hover:bg-blue-50">
                        <span>{entry.content}</span>
                        <button onClick={() => handleDelete(entry.id)} className="hover:bg-red-200 px-2 py-1 rounded-lg">🗑️</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      </>
    );
  };

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

  const groupedEntries: GroupedEntries = entries.reduce<GroupedEntries>((acc, entry) => {
    const date = entry.created_at.split('T')[0];
    const label: string = entry.label;
    if (!acc[date]) {
      acc[date] = {};
    }
    if (!acc[date][label]) {
      acc[date][label] = [];
    }
    acc[date][label].push(entry);
    return acc;
  }, {});



  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">时间线</h1>
      <DiaryEntryForm onAdd={addEntry} />
      <DateCard entries={groupedEntries} />
    </div>
  );
}

export default Timeline;