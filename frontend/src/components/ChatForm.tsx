import React, { useState } from 'react';

interface ChatFormProps {
    onSubmit: (phrase: string) => void;
}

const ChatForm: React.FC<ChatFormProps> = ({ onSubmit }) => {
    const [phrase, setPhrase] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(phrase);
        // setPhrase('');
    };

    return (
        <div className="diary-entry-form p-4 bg-white rounded-lg shadow-lg relative mb-4">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={phrase}
                    onChange={(e) => setPhrase(e.target.value)}
                    placeholder="Hi, 今天有什么进步..."
                    className="w-full p-2 mb-2 border rounded-md"
                />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md">
                    自动生成
                </button>
                <span className="absolute bottom-3 right-3 text-gray-500 px-4 py-2">
                    {new Date().toLocaleDateString()}
                </span>
            </form>
        </div>
    );
};

export default ChatForm;
