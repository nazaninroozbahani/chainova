'use client';

import useFetchPosts from '@/app/hooks/useFetchPosts';
import PostCard from './post-card';
import Spinner from '../common/spinner';
import Pagination from '../common/pagination';
import { useState } from 'react';
import { PAGE_LIMIT } from '@/app/utils/constants';

export default function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, data } = useFetchPosts(
    (Number(currentPage) - 1) * PAGE_LIMIT,
  );

  const changeCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

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
      <h1 className="text-2xl font-bold">Posts</h1>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {data?.posts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          changeCurrentPage={changeCurrentPage}
          totalCount={26}
          pageSize={10}
          siblingCount={1}
        />
      </div>
    </div>
  );
}
