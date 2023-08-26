import React, { useState, useEffect } from 'react';
import EntryForm from './EntryForm';
import DateGroupedEntries from './DateGroupedEntries';
import { EntryType } from './EntryForm';

const Timeline: React.FC = () => {
  const [entries, setEntries] = useState<EntryType[]>([]);

  const addEntry = (newEntry: EntryType) => {
    setEntries(prevEntries => [newEntry, ...prevEntries]);
  };

  const handleDelete = (id: number) => {
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
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

  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">时间线</h1>
      <EntryForm onAdd={addEntry} />
      <DateGroupedEntries entries={entries} onDelete={handleDelete} />
    </div>
  );
}

export default Timeline;
