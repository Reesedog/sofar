import React, { useState } from 'react';

interface Props {
  onAdd: (entry: string) => void;
}

const DiaryEntryForm: React.FC<Props> = ({ onAdd }) => {
  const [entry, setEntry] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (entry) {
      try {
        const response = await fetch('http://34.125.177.255:4000/entries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ content: entry })
        });

        if (response.ok) {
          onAdd(entry);
          setEntry('');
        } else {
          console.error("Error adding entry:", await response.text());
        }
      } catch (error) {
        console.error("Error adding entry:", error);
      }
    }
  };

  return (
    <div className="diary-entry-form">
      <form onSubmit={handleSubmit}>
        <input
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="写下今天的日记..."
        />
        <button type="submit">添加日记</button>
      </form>
    </div>
  );
}

export default DiaryEntryForm;
