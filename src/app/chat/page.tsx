'use client';

import { use, useState } from "react";
import { Menu, MenuItem, MenuButton } from "@/components/ui/Menu";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { ChevronDown } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
    { id: 2, text: "wkwkw", sender: "user" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: messages.length + 1, text: input, sender: "user" }]);
    setInput("");
  };

  return (
    <div className="flex h-screen text-white">
      {/* Sidebar */}
      <aside className="w-1/4" style={{ backgroundColor: "#171717" }}>
        <h1 className="text-xl font-semibold my-2 p-4">Sessions</h1>
        <ul className="space-y-2 p-4">
          <li className="p-2 cursor-pointer hover:bg-gray-700 rounded">Session 1</li>
          <li className="p-2 cursor-pointer hover:bg-gray-700 rounded">Session 2</li>
        </ul>
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col" style={{ backgroundColor: "#212121" }}>
        {/* Header */}
        <header className="p-4 flex justify-between items-center shadow-md" >
          <h1 className="text-xl font-bold">BUN Chat AI</h1>
          <Menu>
            <MenuButton as={Button} className="flex items-center gap-2">
              <Avatar size="sm" className="bg-gray-600" />
              <ChevronDown size={16} />
            </MenuButton>
            <MenuItem onClick={() => { /* handle profile click */ }}>Profile</MenuItem>
            <MenuItem  onClick={() => { /* handle profile click */ }}>Logout</MenuItem>
          </Menu>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col items-center">
          <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`my-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                <div className={`inline-block p-3 rounded-lg ${msg.sender === "user" ? "bg-gray-500 text-white" : "bg-gray-700 text-gray-200"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 flex">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button className="ml-2 bg-gray-700 hover:bg-gray-500">Send</Button>
        </div>
      </main>
    </div>
  );
}
