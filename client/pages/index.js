import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { nanoid } from 'nanoid';

const socket = io('http://localhost:5000');
const chatRooms = ["JavaScript", "C#", "Python"];
const users = ["Alice", "Bob", "Charlie", "Dave"];
const chatList = [
  { id: "1", user: "Alice", message: "Hello" },
  { id: "2", user: "Bob", message: "Hi" },
  { id: "3", user: "Alice", message: "How are you?" },
  { id: "4", user: "Bob", message: "I'm fine. How are you?" },
  { id: "5", user: "Alice", message: "I'm fine too." },
];

export default function Home() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState(chatList);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit('sendMessage',
      { id: nanoid(8), user: selectedUser, message });
    setMessage('');
  };

  useEffect(() => {
    console.log("chat", chat);
  }, [chat]);

  socket.on('info', (payload) => console.log("info payload >> ", payload));

  socket.on('sendMessage', (payload) => {
    setChat([...chat, payload]);
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold text-blue-600">Chatty App</h1>
      <div className="flex min-h-screen w-full justify-between">
        <div className="w-1/4 h-full p-4 m-16">
          <h2 className="text-2xl font-bold mb-4">Chat Rooms</h2>
          <ul className="list-none">
            {chatRooms.map((room) => (
              <li key={room} onClick={() => setSelectedRoom(room)}
                className={`cursor-pointer mb-2 text-blue-500 hover:text-blue-600 ${selectedRoom === room && 'font-bold'}`}>
                {room}
              </li>
            ))}
          </ul>
        </div>

        <main className="flex flex-col items-center justify-center w-full px-20 text-center">
          <div className="w-full h-5/6 p-4 mt-8 mb-8 border border-gray-300 rounded-lg overflow-scroll">
            {chat.map(({ id, user, message }) => (
              <div key={id} className="mb-4">
                <p className="text-gray-400 text-xs">{user}</p>
                <p className="text-lg">{message}</p>
              </div>
            ))}
          </div>

          <form className="w-full mb-8">
            <input
              className="border border-gray-300 rounded-l px-3 py-2 outline-none focus:shadow-outline"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter a message..."
            />

            <button
              className="bg-blue-500 text-white px-3 py-2 rounded-r hover:bg-blue-600"
              type="submit" onClick={sendChat}>
              Send
            </button>
          </form>
        </main>

        <div className="w-1/4 h-full p-4 m-16">
          <h2 className="text-2xl font-bold mb-4">Users</h2>
          <ul className="list-none">
            {users.map((user) => (
              <li key={user} onClick={() => setSelectedUser(user)}
                className={`cursor-pointer mb-2 text-blue-500 hover:text-blue-600 ${selectedUser === user && 'font-bold'}`}>
                {user}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>




  )
}
