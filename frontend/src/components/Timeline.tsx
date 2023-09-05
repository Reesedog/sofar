import React, { useState, useEffect } from 'react';
import EntryForm from './EntryForm';
import DateGroupedEntries from './DateGroupedEntries';
import { EntryType } from './EntryForm';
import { apiRequest } from './apiRequest ';

const Timeline: React.FC = () => {
  const [entries, setEntries] = useState<EntryType[]>([]);

  const addEntry = (newEntry: EntryType) => {
    setEntries(prevEntries => [newEntry, ...prevEntries]);
  };

  const handleDelete = async (id: number) => {
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
    try {
      const response = await apiRequest(`http://34.125.11.145:4000/entries/${id}`, 'DELETE');

      if (response.ok) {
        console.log('Entry deleted successfully');
      } else {
        console.error('Failed to delete entry');
      }

    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        console.log("getting...");
        const response = await apiRequest('http://34.125.11.145:4000/entries', 'GET');

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
    <div className="p-4">
      <h1 style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(10px)' }} className="p-3 text-2xl font-bold mb-4 rounded-xl">时间线</h1>
      <EntryForm onAdd={addEntry} />
      <DateGroupedEntries entries={entries} onDelete={handleDelete} />
    </div>
  );
}

export default Timeline;
