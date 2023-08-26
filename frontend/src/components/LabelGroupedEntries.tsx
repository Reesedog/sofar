import React from 'react';
import Entries from './Entries';
import { EntryType } from './EntryForm';

interface LabelGroupedEntriesProps {
  entries: {
    [label: string]: EntryType[];
  };
  onDelete: (id: number) => void;
}

const LabelGroupedEntries: React.FC<LabelGroupedEntriesProps> = ({ entries, onDelete }) => {
  return (
    <div className="overflow-x-auto whitespace-nowrap flex space-x-4">
      {Object.keys(entries).map(label => (
        <div key={label}
          style={{ width: Object.keys(entries).length > 3 ? '31%' : `${100 / Object.keys(entries).length}%` }}
          className={`mb-4 ${Object.keys(entries).length > 3 ? 'flex-none' : ''}`}>
          <div className="p-4 bg-white rounded-lg shadow-md overflow-x-auto whitespace-nowrap">
            <h3 className="text-lg font-semibold mb-1">{label}</h3>
            {entries[label].map(entry => (
              <Entries key={entry.id} entry={entry} onDelete={onDelete} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LabelGroupedEntries;
