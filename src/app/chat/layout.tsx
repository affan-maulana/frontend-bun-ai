import { FaUserCircle } from 'react-icons/fa';

const ChatLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <body>
      {children}
    </body>

  );
};

export default ChatLayout;