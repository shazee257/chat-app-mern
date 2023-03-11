import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { nanoid } from 'nanoid';

const socket = io('http://localhost:5000');


export default function Home() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit('chat', { message, id: nanoid(8) });
    setMessage('');
  };

  // useEffect(() => {
  socket.on('chat', (payload) => {
    setChat([...chat, payload]);
  });
  // }, [chat]);

  const deleteChat = (id) => {
    // remove chat from id
    const newChat = chat.filter((chat) => chat.id !== id);
    setChat(newChat);
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold text-blue-600">
          Chatty App
        </h1>

        <div className="w-full flex flex-col items-center justify-center mt-10">
          {chat.map(({ message, id }) => (
            <div key={id} className="w-1/2 flex items-center justify-between mb-4">
              <p className="text-xl">{message}</p>
              <button className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                onClick={() => deleteChat(id)}
              >Delete</button>
            </div>
          ))}
        </div>

        <form className="w-full mt-20">
          <input
            className="border border-gray-300 rounded-l px-3 py-2 outline-none focus:shadow-outline"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a message..."
          />
          <button
            className="bg-blue-500 text-white px-3 py-2 rounded-r hover:bg-blue-600"
            type="submit"
            onClick={sendChat}
          >Send</button>
        </form>
      </main>
    </div>

  )
}
