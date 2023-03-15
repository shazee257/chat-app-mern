import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import apiCall from '@/apiCall';

const socket = io('http://localhost:5000');

export default function Home() {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState('');

  const [chat, setChat] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState('6410aa6bf3eaabaa73f8ddfe');
  const [selectedUserId, setSelectedUserId] = useState('6410a8c7f3eaabaa73f8dde7');

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit('sendMessage',
      { userId: selectedUserId, roomId: selectedRoomId, message });
    setMessage('');
  };

  socket.on('info', (payload) => console.log("info payload >> ", payload));

  socket.on('sendMessage', (payload) => {
    console.log("sendMessage payload >>>>> ", payload);
    setChat([...chat, payload]);
  });

  const getMessagesByRoomId = async () => {
    const [data, error] = await apiCall({
      method: 'GET',
      endPoint: `rooms/messages/${selectedRoomId}`,
    });

    if (error) {
      console.log('error: ', error);
    } else {
      setChat(data.data?.messages);
      setUsers(data.data?.users);
      console.log('messages data: ', data.data);
    }
  };

  const getAllUsers = async () => {
    const [data, error] = await apiCall({
      method: 'GET',
      endPoint: 'users',
    });

    if (error) {
      console.log('error: ', error);
    } else {
      setUsers(data?.data);
      console.log('Users data?.data: ', data?.data);
    }
  };

  const getAllRooms = async () => {
    const [data, error] = await apiCall({
      method: 'GET',
      endPoint: 'rooms',
    });

    if (error) {
      console.log('error: ', error);
    } else {
      setRooms(data?.data);
      console.log('Rooms data?.data: ', data?.data);
    }
  };

  useEffect(() => {
    getAllUsers();
    getAllRooms();
  }, []);

  useEffect(() => {
    getMessagesByRoomId();
  }, [selectedRoomId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold text-blue-600">Chatty App</h1>
      <div className="flex h-[500px] w-full justify-between">
        <div className="w-1/4 h-full p-4 m-16">
          <h2 className="text-2xl font-bold mb-4">Chat Rooms</h2>
          <ul className="list-none">
            {rooms.map((room) => (
              <li key={room._id} onClick={() => setSelectedRoomId(room._id)}
                className={`cursor-pointer mb-2 text-blue-500 hover:text-blue-600 ${selectedRoomId === room._id && 'font-bold'}`}>
                {room.name}
              </li>
            ))}
          </ul>
        </div>

        <main className="flex flex-col items-center justify-center w-full px-20 text-center">
          <div className="w-full h-full p-4 mt-8 mb-8 border border-gray-300 rounded-lg overflow-scroll">
            {chat.map((msg) => (
              <div key={msg._id} className="mb-4">
                <p className="text-gray-400 text-xs">{msg.senderId?.username}</p>
                <p className="text-lg">{msg.message}</p>
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
              <li key={user._id} onClick={() => setSelectedUserId(user._id)}
                className={`cursor-pointer mb-2 text-blue-500 hover:text-blue-600 ${selectedUserId === user._id && 'font-bold'}`}>
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
