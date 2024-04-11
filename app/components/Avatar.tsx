import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
interface AvatarProps {
  src?: string | null | undefined;
}
const Avatar: React.FC<AvatarProps> = ({ src }) => {
  if (src)
    return (
      //   <img src={src} alt="Avatar" className="w-6 h-6 rounded-full" />
      <Image
        src={src}
        alt="Avatar"
        className="rounded-full "
        width={30}
        height={30}
      />
    );
  return <FaUserCircle size={24} />;
};

export default Avatar;
