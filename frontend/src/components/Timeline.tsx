import React, { useState, useEffect } from 'react';
import EntryForm from './EntryForm';
import DateGroupedEntries from './DateGroupedEntries';
import { EntryType } from './EntryForm';

const Timeline: React.FC = () => {
  const [entries, setEntries] = useState<EntryType[]>([]);

  const addEntry = (newEntry: EntryType) => {
    setEntries(prevEntries => [newEntry, ...prevEntries]);
  };

  const handleDelete = async (id: number) => {
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
    try {
      const accessToken = localStorage.getItem('access-token');
      const client = localStorage.getItem('client');
      const uid = localStorage.getItem('uid');
      if (accessToken && client && uid) {
        const response = await fetch(`http://34.125.11.145:4000/entries/${id}`, {
          method: 'DELETE',
          headers: {
            'access-token': accessToken,
            'client': client,
            'uid': uid,
            'Content-Type': 'application/json',
          }
        });
        if (response.ok) {
          setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
        } else {
          console.error("Error deleting entry:", await response.text());
        }
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const accessToken = localStorage.getItem('access-token');
        const client = localStorage.getItem('client');
        const uid = localStorage.getItem('uid');
        if (accessToken && client && uid) {
          const response = await fetch('http://34.125.11.145:4000/entries', {
            headers: {
              'access-token': accessToken,
              'client': client,
              'uid': uid,
            }
          });
          if (response.ok) {
            console.log(response);
            const data = await response.json();
            const headers = response.headers;
            const accessToken = headers.get('Access-Token');
            const client = headers.get('Client');
            const uid = headers.get('Uid');
            console.log(accessToken, client, uid);
            if (accessToken && client && uid) {
              localStorage.setItem('access-token', accessToken);
              localStorage.setItem('client', client);
              localStorage.setItem('uid', uid);
            }

            setEntries(data);
          } else {
            console.error("Error fetching entries:", await response.text());
          }
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
