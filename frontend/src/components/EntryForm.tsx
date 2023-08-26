import React, { useState } from 'react';

export type EntryType = {
  id: number;
  content: string;
  created_at: string;
  label: string;
};

interface EntryFormProps {
  onAdd: (newEntry: EntryType) => void;
}

const EntryForm: React.FC<EntryFormProps> = ({ onAdd }) => {
  const [content, setContent] = useState('');
  const [label, setLabel] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content) {
      try {
        const response = await fetch('http://34.125.177.255:4000/entries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ content: content, label: label })
        });

        if (response.ok) {
          const data: EntryType = await response.json();
          onAdd(data);
          setContent('');
        } else {
          console.error("Error adding entry:", await response.text());
        }
      } catch (error) {
        console.error("Error adding entry:", error);
      }
    }
  };

  return (
    <div className="diary-entry-form p-4 bg-white rounded-lg shadow-lg relative mb-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="写下记录的标签..."
          className="w-full p-2 mb-2 border rounded-md"
        />
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="写下今天的记录..."
          className="w-full p-2 mb-2 border rounded-md"
        />

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md">
          添加日记
        </button>
        <span className="absolute bottom-3 right-3 text-gray-500 px-4 py-2">
          {new Date().toLocaleDateString()}
        </span>
      </form>
    </div>
  );
}

export default EntryForm;
