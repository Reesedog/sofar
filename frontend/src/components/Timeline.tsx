import React, { useState, useEffect } from 'react';
import DiaryEntryForm from './DiaryEntryForm';

const Timeline: React.FC = () => {
  const [entries, setEntries] = useState<string[]>([]);

  const addEntry = (entry: string) => {
    setEntries(prevEntries => [entry, ...prevEntries]);
  };

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch('http://34.125.177.255:4000/entries');
        if (response.ok) {
          const data = await response.json();
          setEntries(data.map((entry: any) => entry.content));
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
    <div>
      <h1>TIMELINE</h1>
      <DiaryEntryForm onAdd={addEntry} />
      <div className="entries">
        {entries.map((entry, index) => (
          <div key={index} className="entry-card">
            {entry}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;
