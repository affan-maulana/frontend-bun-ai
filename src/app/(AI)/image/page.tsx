"use client";

import { useEffect, useState } from "react";
import { Menu, MenuItem, MenuButton } from "@/components/ui/Menu";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { Image as ChatImage } from "@/types/chat";
import axiosInstance from "@/utils/axios";
import { apiErrorHandler } from "@/utils/apiHandlers";
import { Spinner } from "@/components/assets/spinner";
import Image from "next/image";

export default function ChatPage() {
  const [images, setImages] = useState<ChatImage[]>([]);
  const [input, setInput] = useState("");
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [newImageName, setNewImageName] = useState<string>("");
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!input.trim()) return;
    setInput("");

    try {
      setLoading(true);
      const response = await axiosInstance.post(`/ai/image`, {
        prompt: input,
      });

      if (response.data?.success) {
        setLoading(false);
        setSelectedImageId(response.data.data.id);
        setSelectedImageUrl(response.data.data.url);
        setImages((prevImages) => [response.data.data, ...prevImages]);
      } else {
        console.error("Response tidak sukses:", response.data);
      }
    } catch (error) {
      setLoading(false);
      alert(apiErrorHandler(error));
    }
  };

  const handleLogout = async () => {
    localStorage.clear();
    window.location.href = "/auth/login";
  };

  const imgLoader = ({ src }: { src: string }) => {
    return src;
  };

  const handleGetImage = async (imageId: string, url: string) => {
    if (imageId === selectedImageId) {
      return
    }

    try {
      const response = await axiosInstance.get(`/ai/image/${imageId}`);
      if (response.data?.success) {
        setSelectedImageId(imageId);
        setSelectedImageUrl(url);
      } else {
        console.error("Response tidak sukses:", response.data);
      }
    } catch (error) {
      alert(apiErrorHandler(error));
    }
  };

  const getImages = async () => {
    try {
      const response = await axiosInstance.get(`/ai/images`);

      if (response.data?.success) {
        setImages(response.data.data);
      } else {
        console.error("Response tidak sukses:", response.data);
      }
    } catch (error) {
      alert(apiErrorHandler(error));
      return;
    }
  };

  const handleRenameImage = async (imageId: string) => {
    try {
      await axiosInstance.put(`/ai/image/${imageId}`, {
        name: newImageName,
      });
      setImages(
        images.map((image) =>
          image.id === imageId ? { ...image, name: newImageName } : image
        )
      );
      setEditingImageId(null);
      setNewImageName("");
    } catch (error) {
      alert(apiErrorHandler(error));
    }
  };

  // const handleDeleteImage = async (imageId: string) => {
  //   try {
  //     await axiosInstance.delete(`/ai/image/${imageId}`);
  //     setImages(images.filter((image) => image.id !== imageId));

  //     if (imageId == selectedImageId) {
  //       // setSelectedImageId('')
  //     }
  //   } catch (error) {
  //     alert(apiErrorHandler(error));
  //   }
  // };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div className="flex h-screen text-white">
      {/* Sidebar */}
      <aside
        className="w-1/5 flex flex-col justify-between"
        style={{ backgroundColor: "#171717" }}
      >
        <div>
          <h1 className="text-xl font-semibold my-2 p-4">Images</h1>
          {[...images].reverse().map((image, index) => (
            <li
              key={index}
              className={`p-2 flex justify-between items-center hover:bg-gray-700 rounded ${
                selectedImageId === image.id ? "bg-gray-700" : ""
              }`}
              onClick={() => handleGetImage(image.id, image.url)}
            >
              {editingImageId === image.id ? (
                <input
                  type="text"
                  value={newImageName}
                  onChange={(e) => setNewImageName(e.target.value)}
                  onBlur={() => handleRenameImage(image.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleRenameImage(image.id);
                    }
                  }}
                  className="bg-gray-700 text-white p-2 rounded"
                />
              ) : (
                <span
                  onDoubleClick={() => {
                    setEditingImageId(image.id);
                    setNewImageName(image.name ?? "New image");
                  }}
                >
                  {image.name ?? "New image"}
                </span>
              )}
              <Menu>
                <MenuButton as={Button} className="flex items-center gap-2">
                  <MoreHorizontal size={16} />
                </MenuButton>
                <MenuItem
                  onClick={() => {
                    setEditingImageId(image.id);
                    setNewImageName(image.name ?? "New image");
                  }}
                >
                  Rename
                </MenuItem>
                {/* <MenuItem
                  danger={true}
                  onClick={() => handleDeleteImage(image.id)}
                >
                  Delete
                </MenuItem> */}
              </Menu>
            </li>
          ))}
        </div>
        <div className="flex justify-center p-4">
          <Button
            className="m-1 w-full bg-gray-700 hover:bg-gray-500"
            onClick={() => (window.location.href = "/chat")}
          >
            Chat AI
          </Button>
        </div>
      </aside>

      {/* Image Area */}
      <main
        className="flex-1 flex flex-col"
        style={{ backgroundColor: "#212121" }}
      >
        {/* Header */}
        <header className="p-4 flex justify-between items-center shadow-md">
          <h1 className="text-xl font-bold">BUN Chat AI - Generate Image</h1>
          <Menu>
            <MenuButton as={Button} className="flex items-center gap-2">
              <Avatar size="sm" className="bg-gray-600" />
              <ChevronDown size={16} />
            </MenuButton>
            <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
          </Menu>
        </header>

        {/* Image Preview */}
        {loading ? (
          <div className="flex-1 flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex-1 p-4 overflow-y-auto flex flex-col items-center">
            <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
              {selectedImageUrl && (
                <div className="bg-gray-800 rounded-lg p-4 w-full flex justify-center">
                  <Image
                    loader={imgLoader}
                    src={selectedImageUrl}
                    alt="Generated Image"
                    className="rounded-lg"
                    width={500} // specify the width
                    height={500} // specify the height
                    unoptimized
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {/* Prompt Input */}
        <div className="p-4 flex">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
            placeholder="Prompt ..."
            disabled={loading}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Mencegah line break di input
                generateImage();
              }
            }}
          />
          <Button
            onClick={generateImage}
            className="ml-2 bg-gray-700 hover:bg-gray-500"
            disabled={loading}
          >
            Send
          </Button>
        </div>
      </main>
    </div>
  );
}
