'use client';

import { useState } from "react";
import { Menu, MenuItem, MenuButton } from "@/components/ui/Menu";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { ChevronDown } from "lucide-react";
import axios from "axios";
import { Message } from "@/types/chat";

export default function ChatPage() {
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const sendMessage = async () => {
    if (!input.trim()) return;
    setInput("");
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: input, role: "user" },
    ]);

    // Kirim pesan ke server
    try{
      const response = await axios.post(
        `${baseUrl}/chat/ee80ffaf-f15b-4a86-bc10-bba845f3a091`, 
        { 
          history: messages,
          message: input 
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiIzOGE4ZWRkYS0wYjczLTRhNmItOWZkYS0zMWNhMzZiNWI4ZWMiLCJlbWFpbCI6ImFmZmFuLm0xOTkzQGdtYWlsLmNvbSJ9LCJyb2xlIjoiY2xpZW50IiwiZXhwIjoxNzM5ODI4ODcyfQ.CbnFn_Snqb3bvw484KGENbESfYdalMyptgpK2fWVmL0`,
          },
        },
      );

      if (response.data?.success) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { content: response.data.data, role: "assistant" },
        ]);
      } else {
        console.error("Response tidak sukses:", response.data);
      }
    } catch (error) {
      console.error("Error saat mengirim pesan:", error);
    }
  };

  return (
    <div className="flex h-screen text-white">
      {/* Sidebar */}
      <aside className="w-1/5" style={{ backgroundColor: "#171717" }}>
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
            {messages.map((msg, index) => (
              <div key={index} className={`my-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                <div className={`inline-block p-3 rounded-lg ${msg.role === "user" ? "bg-gray-500 text-white" : "bg-gray-700 text-gray-200"}`}>
                  {msg.content}
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Mencegah line break di input
                sendMessage();
              }
            }}
          />
          <Button onClick={sendMessage} className="ml-2 bg-gray-700 hover:bg-gray-500">Send</Button>
        </div>
      </main>
    </div>
  );
}
