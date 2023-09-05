import React from 'react';
import LabelGroupedEntries from './LabelGroupedEntries';
import { EntryType } from './EntryForm';

type GroupedEntries = {
  [date: string]: {
    [label: string]: EntryType[];
  };
};

interface DateGroupedEntriesProps {
  entries: EntryType[];
  onDelete: (id: number) => void;
}

const DateGroupedEntries: React.FC<DateGroupedEntriesProps> = ({ entries, onDelete }) => {
  const groupedEntries: GroupedEntries = entries.reduce<GroupedEntries>((acc, entry) => {
    const date = entry.created_at.split('T')[0];
    if (!acc[date]) {
      acc[date] = {};
    }
    if (!acc[date][entry.label]) {
      acc[date][entry.label] = [];
    }
    acc[date][entry.label].push(entry);
    return acc;
  }, {});

  return (
    <>
      {Object.keys(groupedEntries).map(date => (
        <div key={date} className="mb-3.5">
          <h2 style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(10px)' }} className="py-1 px-3 rounded-xl text-xl font-bold mb-2 ">{date}</h2>
          <LabelGroupedEntries entries={groupedEntries[date]} onDelete={onDelete} />
        </div>
      ))}
    </>
  );
};

export default DateGroupedEntries;
