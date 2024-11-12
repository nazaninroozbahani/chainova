import { Comment } from '@/definitions';
import Image from 'next/image';

interface Props {
  comment: Comment;
}

export default function CommentCard({
  comment: {
    user: { username, fullName },
    body,
    likes,
  },
}: Props) {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Image
          alt="user"
          src="/icons/user.svg"
          width={64}
          height={64}
          className="opacity-50"
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-700">{fullName}</p>
          <p className="text-xs text-gray-500">{username}</p>
        </div>
      </div>
      <p className="mt-4 text-gray-500">{body}</p>
      <div className="mt-2 flex items-center gap-2">
        <Image alt="like" src="/icons/like.svg" width={16} height={16} />
        <span>{likes}</span>
      </div>
    </div>
  );
}
