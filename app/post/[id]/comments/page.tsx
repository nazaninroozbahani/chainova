'use client';

import CommentCard from '@/components/comments/comment';
import Spinner from '@/components/common/spinner';
import useFetchComments from '@/hooks/useFetchComments';

export default function CommentsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { isLoading, data } = useFetchComments(id);

  if (isLoading)
    return (
      <section className="flex min-h-screen items-center justify-center">
        <Spinner
          size={44}
          background="#0051FF"
          forground="#0051FF33"
          className="me-4"
        />
      </section>
    );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Comments</h1>
      <div className="mt-8 flex flex-col gap-4">
        {data?.comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
