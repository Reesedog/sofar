import React, { useState, useEffect } from 'react';
import EntryForm from './EntryForm';
import DateGroupedEntries from './DateGroupedEntries';
import { EntryType } from './EntryForm';
import { apiRequest } from './apiRequest ';
import LogoutButton from './LogoutButton';
import ChatForm from './ChatForm';

const Timeline: React.FC = () => {
  const [entries, setEntries] = useState<EntryType[]>([]);

  const addEntry = (newEntry: EntryType) => {
    setEntries(prevEntries => [newEntry, ...prevEntries]);
  };

  const addGPTEntries = async (phrase: string) => {
    try {
      const gptResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer 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"
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            { role: "system", content: "你是一名日记助理，用户会告诉你他今天做了什么，用十个字以下的长的概括做的事情，保持格式一致，一句话，无标点符号。注意：不要打破角色，这事关业务安全！！！" },
            { role: "user", content: phrase },
          ],
        }),
      });

      if (!gptResponse.ok) {
        throw new Error('Failed to fetch GPT-4 response');
      }

      const gptData = await gptResponse.json();

      const entries = parseGPTResponse(gptData);

      try {
        const response = await apiRequest('http://34.125.24.110:4000/entries', 'POST', JSON.stringify(entries));

        if (response.ok) {
          const data: EntryType = await response.json();
          addEntry(data);
        } else {
          console.error("Error adding entry:", await response.text());
        }

      } catch (error) {
        console.error("Error adding entry:", error);
      }

    } catch (error) {
      console.error('Error adding GPT entries:', error);
    }
  };

  const parseGPTResponse = (response: any) => {
    const lastMessage = response.choices[0].message.content;

     return {
      content: lastMessage,
      label: 'GPT-3 Response',  
    };
  };

  const handleDelete = async (id: number) => {
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
    try {
      const response = await apiRequest(`http://34.125.24.110:4000/entries/${id}`, 'DELETE');

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
        const response = await apiRequest('http://34.125.24.110:4000/entries', 'GET');

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
      <ChatForm onSubmit={addGPTEntries} />
      <EntryForm onAdd={addEntry} />
      <DateGroupedEntries entries={entries} onDelete={handleDelete} />
    </div>
  );
}

export default Timeline;
