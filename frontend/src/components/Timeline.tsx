import React, { useState, useEffect } from 'react';
import EntryForm from './EntryForm';
import DateGroupedEntries from './DateGroupedEntries';
import { EntryType } from './EntryForm';
import { apiRequest } from './apiRequest ';
import LogoutButton from './LogoutButton';

const Timeline: React.FC = () => {
  const [entries, setEntries] = useState<EntryType[]>([]);

  const addEntry = (newEntry: EntryType) => {
    setEntries(prevEntries => [newEntry, ...prevEntries]);
  };

  const handleDelete = async (id: number) => {
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
    try {
      const response = await apiRequest(`http://34.16.165.178:4000/entries/${id}`, 'DELETE');

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
        const response = await apiRequest('http://34.16.165.178:4000/entries', 'GET');

        if (response.ok) {
          const data = await response.json();
          setEntries(data);
        } else {
          console.error("Error fetching entries:", await response.text());
          window.location.href = '/login';
        }

      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="p-4">
      <header style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(10px)' }} className="p-3 mb-4 rounded-xl flex justify-between items-center">
        <h1 className="text-2xl font-bold" >时间线</h1>
        <LogoutButton />
      </header>
      <EntryForm onAdd={addEntry} />
      <DateGroupedEntries entries={entries} onDelete={handleDelete} />
    </div>
  );
}

export default Timeline;
