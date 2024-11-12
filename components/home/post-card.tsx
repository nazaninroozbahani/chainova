import { Post } from '@/definitions';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  post: Post;
}

export default function PostCard({
  post: {
    id,
    title,
    reactions: { likes, dislikes },
    tags,
    views,
  },
}: Props) {
  return (
    <Link
      href={`/post/${id}`}
      className="cursor-pointer rounded-lg border p-4 shadow-sm duration-150 hover:shadow-xl"
    >
      <h2 className="text-center text-lg font-semibold text-gray-700">
        {title}
      </h2>
      <div className="mt-8 flex items-center gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-3xl bg-gray-100 px-4 py-1 text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image alt="eye" src="/icons/view.svg" width={16} height={16} />
          <span>{views}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Image
              alt="dislike"
              src="/icons/dislike.svg"
              width={16}
              height={16}
            />
            <span>{dislikes}</span>
          </div>
          <div className="flex items-center gap-2">
            <Image alt="like" src="/icons/like.svg" width={16} height={16} />
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
