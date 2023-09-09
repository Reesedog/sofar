import React, { useState, useEffect } from 'react';
import EntryForm from './EntryForm';
import DateGroupedEntries from './DateGroupedEntries';
import { EntryType } from './EntryForm';
import { apiRequest } from './apiRequest ';
import LogoutButton from './LogoutButton';
import ChatForm from './ChatForm';
import CategoryModal from './CategoryModal';

const Timeline: React.FC = () => {
  const [entries, setEntries] = useState<EntryType[]>([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const handleOpenCategoryModal = () => {
    setIsCategoryModalOpen(true);
  };

  const handleCloseCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  const addEntry = (newEntry: EntryType) => {
    setEntries(prevEntries => [newEntry, ...prevEntries]);
  };

  const addGPTEntries = async (phrase: string) => {
    let data;
    try {

      const response = await apiRequest('http://34.125.24.110:4000/categories', 'GET');
      if (response.ok) {
        data = await response.json();
    
      } else {
        console.error('Error fetching categories:', await response.text());
      }

      const categoryNames = data.map((category: any) => category.name).join(', ');
      console.log(categoryNames);
      const gptResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer "
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              "role": "system",
              "content": `你是一名日记助理，你的任务是帮助用户记录他们每天的进步。用户将告诉你他们当天做了什么或学到了什么新知识。你需要将用户提供的信息分类，并根据其描述创建一个包含‘label’和‘content’两个字段的JSON对象来记录他们的进步。你的label只能从下面的列表里挑选：${categoryNames}‘content’字段应简洁明了、无标点，且不超过十个字。请注意，你的回复必须仅为JSON格式的对象，以便于用户进行解析。保持角色的一致性是非常重要的，因为这事关业务安全。`
            },
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
        const response = await apiRequest('http://34.125.24.110:4000/entries', 'POST', gptData.choices[0].message.content);

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
      <button onClick={handleOpenCategoryModal} className="px-4 py-2 mb-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md">
        管理标签
      </button>

      {isCategoryModalOpen && (
        <CategoryModal
          isOpen={isCategoryModalOpen}
          onClose={handleCloseCategoryModal}
        />
      )}

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
