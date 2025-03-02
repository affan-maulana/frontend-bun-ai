export interface Message {  
  content: string;
  role: string;
}

export interface Chat {
  id?: string;
  message: string;
  isQuestion: boolean;
  createdAt?: string;
  updatedAt?: string;
  sessionId: string;
}

export interface Session {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface Image {
  id: string;
  name: string;
  url: string;
  createdAt?: string | null;
  updatedAt?: string | null;
}