// @packages
import { ReactNode } from "react";

// @interfaces
interface IMessageProps {
  children: ReactNode;
  type: string;
}

const Message = ({ children, type }: IMessageProps) => (
  <div className={`alert ${type}`}>{children}</div>
);

export default Message;
