import React from 'react';
import { apiRequest } from './apiRequest ';

const LogoutButton: React.FC = () => {
    const handleLogout = async () => {
        try {
            const response = await apiRequest(`http://34.125.11.145:4000/auth/sign_out`, 'DELETE');

            if (response.ok) {
                console.log('成功登出');
            } else {
                console.error('登出失败');
            }

            window.location.href = '/login';
        } catch (error) {
            console.error('登出时发生错误:', error);
        }
    };

    return <button onClick={handleLogout} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md">
        登出
    </button>;
};

export default LogoutButton;
