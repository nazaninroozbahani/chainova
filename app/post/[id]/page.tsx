import Image from 'next/image';

async function getPost(id: string) {
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }

  const responseBody = await res.json();
  console.log('resss', responseBody);
  return responseBody;
}

export default async function PostPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const {
    title,
    body,
    reactions: { likes, dislikes },
    tags,
    views,
  } = await getPost(id);

  return (
    <div className="mx-auto mt-56 w-full rounded-lg border p-4 sm:w-[600px]">
      <h2 className="text-center text-lg font-semibold text-gray-700">
        {title}
      </h2>
      <p className="mt-8 text-gray-500">{body}</p>
      <div className="mt-8 flex items-center gap-2">
        {tags.map((tag: string) => (
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
    </div>
  );
}
