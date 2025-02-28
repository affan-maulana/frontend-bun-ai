"use client";

import { useEffect, useState } from "react";
import { Menu, MenuItem, MenuButton } from "@/components/ui/Menu";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { Message, Session, Chat } from "@/types/chat";
import axiosInstance from "@/utils/axios";
import { apiErrorHandler } from "@/utils/apiHandlers";

export default function ChatPage() {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [input, setInput] = useState("");
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [newSessionName, setNewSessionName] = useState<string>("");
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [sessionMessages, setSessionMessages] = useState<Chat[]>([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setInput("");
    setChatHistory((prevMessages) => [
      ...prevMessages,
      { content: input, role: "user" },
    ]);

    setSessionMessages((prevMessages) => [
      ...prevMessages,
      { message: input, isQuestion: true, sessionId: selectedSessionId ?? "" },
    ]);

    // Kirim pesan ke server
    try {
      const response = await axiosInstance.post(`/ai/chat/${selectedSessionId}`,
        {
          history: chatHistory,
          message: input,
        }
      );

      if (response.data?.success) {
        setChatHistory((prevMessages) => [
          ...prevMessages,
          { content: response.data.data, role: "assistant" },
        ]);

        setSessionMessages((prevMessages) => [
          ...prevMessages,
          { message: response.data.data, isQuestion: false, sessionId: selectedSessionId ?? "" }
        ]);
      } else {
        console.error("Response tidak sukses:", response.data);
      }
    } catch (error) {
      console.error("Error saat mengirim pesan:", error);
    }
  };

  const handleLogout = async () => {
    localStorage.clear();
    window.location.href = "/auth/login";
  };

  const handleGetChat = async (sessionId: string) => {
    try {
      const response = await axiosInstance.get(`/ai/chat/${sessionId}`);
      if (response.data?.success) {
        setSessionMessages(response.data.data.messages);
        setSelectedSessionId(sessionId);

        const chatHistory = response.data.data.messages.map((msg: Chat) => ({
          content: msg.message,
          role: msg.isQuestion ? "user" : "assistant",
        }));

        setChatHistory(chatHistory);

      } else {
        console.error("Response tidak sukses:", response.data);
      }
    } catch (error) {
      alert(apiErrorHandler(error));
    }
  };

  const getSession = async () => {
    try {
      const response = await axiosInstance.get(`/session`);

      if (response.data?.success) {
        setSessions(response.data.data);
      } else {
        console.error("Response tidak sukses:", response.data);
      }
    } catch (error) {
      alert(apiErrorHandler(error));
      return;
    }
  };

  const handleRenameSession = async (sessionId: string) => {
    try {
      await axiosInstance.put(`/session/${sessionId}`, {
        newName: newSessionName,
      });
      setSessions(
        sessions.map((session) =>
          session.id === sessionId
            ? { ...session, name: newSessionName }
            : session
        )
      );
      setEditingSessionId(null);
      setNewSessionName("");
    } catch (error) {
      alert(apiErrorHandler(error));
    }
  };

  const handleDeleteSession = async (sessionId: string) => {
    try {
      await axiosInstance.delete(`/session/${sessionId}`);
      setSessions(sessions.filter((session) => session.id !== sessionId));

      if (sessionId == selectedSessionId) {
        setChatHistory([])
        setSessionMessages([])
        // setSelectedSessionId('')
      }
    } catch (error) {
      alert(apiErrorHandler(error));
    }
  };

  const handleNewSession = async () => {
    console.log("new session");

    try {
      const response = await axiosInstance.post(`/session`);
      console.log("response", response);
      setChatHistory([]);
      setSessionMessages([]);
      setSelectedSessionId(response.data.data.id);
      setSessions([...sessions, response.data.data]);
    } catch (error) {
      alert(apiErrorHandler(error));
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  return (
    <div className="flex h-screen text-white">
      {/* Sidebar */}
      <aside className="w-1/5" style={{ backgroundColor: "#171717" }}>
        <h1 className="text-xl font-semibold my-2 p-4">Sessions</h1>
        <ul className="space-y-2 mx-2">
          <li key="new" className="flex justify-end">
            <Button
              onClick={() => handleNewSession()}
              className="m-1 bg-gray-700 hover:bg-gray-500"
            >
              +
            </Button>
          </li>
          {[...sessions].reverse().map((session, index) => (
            <li
            key={index}
            className={`p-2 flex justify-between items-center hover:bg-gray-700 rounded ${selectedSessionId === session.id ? 'bg-gray-700' : ''}`}
            onClick={() => handleGetChat(session.id)}
          >
            {editingSessionId === session.id ? (
              <input
                type="text"
                value={newSessionName}
                onChange={(e) => setNewSessionName(e.target.value)}
                onBlur={() => handleRenameSession(session.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleRenameSession(session.id);
                  }
                }}
                className="bg-gray-700 text-white p-2 rounded"
              />
            ) : (
              <span
                onDoubleClick={() => {
                  setEditingSessionId(session.id);
                  setNewSessionName(session.name ?? "New Session");
                }}
              >
                {session.name ?? "New Session"}
              </span>
            )}
            <Menu>
              <MenuButton as={Button} className="flex items-center gap-2">
                <MoreHorizontal size={16} />
              </MenuButton>
              <MenuItem
                onClick={() => {
                  setEditingSessionId(session.id);
                  setNewSessionName(session.name ?? "New Session");
                }}
              >
                Rename
              </MenuItem>
              <MenuItem
                danger={true}
                onClick={() => handleDeleteSession(session.id)}
              >
                Delete
              </MenuItem>
            </Menu>
          </li>
          ))}
        </ul>
      </aside>

      {/* Chat Area */}
      <main
        className="flex-1 flex flex-col"
        style={{ backgroundColor: "#212121" }}
      >
        {/* Header */}
        <header className="p-4 flex justify-between items-center shadow-md">
          <h1 className="text-xl font-bold">BUN Chat AI</h1>
          <Menu>
            <MenuButton as={Button} className="flex items-center gap-2">
              <Avatar size="sm" className="bg-gray-600" />
              <ChevronDown size={16} />
            </MenuButton>
            <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
          </Menu>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col items-center">
          <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
            {sessionMessages.map((msg, index) => (
              <div
                key={index}
                className={`my-2 ${
                  msg.isQuestion ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    msg.isQuestion
                      ? "bg-gray-500 text-white"
                      : "bg-gray-700 text-gray-200"
                  }`}
                >
                  {msg.message}
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
          <Button
            onClick={sendMessage}
            className="ml-2 bg-gray-700 hover:bg-gray-500"
          >
            Send
          </Button>
        </div>
      </main>
    </div>
  );
}
