import React from 'react';
import { EntryType } from './EntryForm';

interface EntriesProps {
  entry: EntryType;
  onDelete: (id: number) => void;
}

const Entries: React.FC<EntriesProps> = ({ entry, onDelete }) => {
  return (
    <div className="border-2 border-slate-100 items-center entry p-2 bg-white rounded-lg shadow-lg mb-2 flex justify-between hover:bg-blue-50">
      <span>{entry.content}</span>
      <button onClick={() => onDelete(entry.id)} className="hover:bg-red-200 px-2 py-1 rounded-lg">🗑️</button>
    </div>
  );
};

export default Entries;
