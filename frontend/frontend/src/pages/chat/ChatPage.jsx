import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import fetchUserDetails from '../../utilities/api/FetchUserDetails';

function ChatPage() {
  const { username2 } = useParams();
  const username1 = Cookies.get('username');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatMessagesRef = useRef(null);
  const socketRef = useRef(null);
  const initializedRef = useRef(false);
  const typingTimeoutRef = useRef(null);
  const unsavedMessagesRef = useRef([]);
  const unsavedMessagesIntervalRef = useRef(null);

  useEffect(() => {
    // Fetch user details to get the profile picture
    const getUserDetails = async () => {
      const userDetails = await fetchUserDetails();
      console.log(userDetails);
      if (userDetails) {
        setUsername1(userDetails.username);
      }
    };

    getUserDetails();
  }, []);

  const initializeWebSocket = () => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const socketUrl = `${protocol}://${window.location.hostname}:8000/ws/chat/${username1}/${username2}/`;

    socketRef.current = new WebSocket(socketUrl);

    socketRef.current.onopen = () => {
      console.log('WebSocket connection opened');
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { username: data.username, content: data.message },
      ]);
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socketRef.current.onclose = async (event) => {
      console.log('WebSocket connection closed', event);

      if (unsavedMessagesRef.current.length > 0) {
        await sendUnsavedMessages();
      }

      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  };

  const fetchMessages = async () => {
    const roomName = `chat_${[username1, username2].sort().join('_')}`;
    try {
      const response = await axios.get(`http://127.0.0.1:8000/chats/get/${roomName}/`);
      setMessages(response.data.messages);

      if (chatMessagesRef.current) {
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  if (!initializedRef.current) {
    initializedRef.current = true;
    initializeWebSocket();
    fetchMessages();
  }

  const sendUnsavedMessages = async () => {
    if (unsavedMessagesRef.current.length > 0) {
      try {
        // Flag to track if messages are being sent
        let sendingMessages = false;

        await Promise.all(
          unsavedMessagesRef.current.map(async (message) => {
            if (!message.isSent && !sendingMessages) {
              sendingMessages = true; // Set the flag to true when sending
              const messageData2 = {
                body: message.content,
                username: message.username,
                room: `chat_${[username1, username2].sort().join('_')}`,
                time_added: new Date().toISOString(),
              };

              await axios.post(`http://127.0.0.1:8000/chats/store/`, messageData2, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                },
              });

              // Mark the message as sent
              message.isSent = true;
            }
          })
        );
        unsavedMessagesRef.current = []; // Clear after successful save
      } catch (error) {
        console.error('Error sending unsaved messages:', error);
      }
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const messageData = {
      content: newMessage,
      username: username1,
      room_slug: `chat_${[username1, username2].sort().join('_')}`,
      time_added: new Date().toISOString(),
      isLocal: true,
      user: username1,
      isSent: false,  // Track if the message has been sent
    };

    setNewMessage('');
    unsavedMessagesRef.current.push(messageData);

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ message: newMessage }));
    } else {
      console.error('WebSocket is not open');
    }

    resetTypingTimeout();
  };

  const resetTypingTimeout = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      sendUnsavedMessages();
    }, 500);  // Set the interval to 0.5 seconds (500 ms)
  };

  const handleDeleteMessages = async () => {
    const roomName = `chat_${[username1, username2].sort().join('_')}`;
    try {
      await axios.delete(`http://127.0.0.1:8000/chats/delete/${roomName}/`);
      setMessages([]); // Clear the chat in the frontend
    } catch (error) {
      console.error('Error deleting messages:', error);
    }
  };

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    unsavedMessagesIntervalRef.current = setInterval(() => {
      sendUnsavedMessages();
    }, 500);  // Sends unsaved messages every 0.5 seconds

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      if (unsavedMessagesIntervalRef.current) {
        clearInterval(unsavedMessagesIntervalRef.current);
      }

      const delayClose = async () => {
        if (unsavedMessagesRef.current.length > 0) {
          await sendUnsavedMessages();
        }
      };

      delayClose();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <div className="p-6 lg:p-12 text-center">
        <h1 className="text-4xl lg:text-5xl text-teal-700 font-bold">
          Chat with {username2}
        </h1>
      </div>
  
      <div className="lg:w-3/4 w-full mx-4 lg:mx-auto p-6 bg-white rounded-3xl shadow-xl">
        <div
          className="chat-messages space-y-4 overflow-y-auto max-h-96 min-h-96 p-6 border border-gray-200 rounded-2xl bg-gray-50"
          ref={chatMessagesRef}
        >
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.username === username1 ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    msg.username === username1
                      ? "bg-teal-500 text-white"
                      : "bg-gray-200 text-black"
                  } rounded-lg p-4 max-w-xs lg:max-w-md break-words shadow-md`}
                >
                  <b>{msg.username}</b>: {msg.body ? msg.body : msg.content}
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center mt-4">
              No messages yet. Start the conversation!
            </div>
          )}
        </div>
      </div>
  
      <div className="lg:w-3/4 w-full mx-4 lg:mx-auto mt-6">
        <button
          onClick={handleDeleteMessages}
          className="px-6 py-3 rounded-full text-white bg-red-600 hover:bg-red-700 transition-all duration-200 shadow-lg w-full lg:w-auto"
        >
          Delete All Messages
        </button>
      </div>
  
      <div className="lg:w-3/4 w-full mt-6 mx-4 lg:mx-auto p-6 bg-white rounded-3xl shadow-xl">
        <form onSubmit={handleSendMessage} className="flex space-x-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              resetTypingTimeout();
            }}
            className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700"
            placeholder="Type your message here..."
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-full text-white bg-teal-600 hover:bg-teal-700 transition-all duration-200 shadow-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatPage;
