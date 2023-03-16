import React, { useState } from "react";
import ContentHead from "./ContentHead";
import BookCard from "./BookCard";
import { useGetBooksQuery } from "../features/api/apiSlice";
import Loading from "./ui/Loading";
import Error from "./ui/Error";

export default function Home({ search }) {
  const { data: books, isLoading, isError } = useGetBooksQuery();
  const [isFeatured, setIsFeatured] = useState(false);

  let content = null;

  if (isLoading) content = <Loading />;

  if (!isLoading && isError) content = <Error message="There was an error!" />;

  if (!isLoading && !isError && books?.length > 0 && !isFeatured && !search) {
    content = books.map((book) => (
      <BookCard key={book.id} bookDetails={book} />
    ));
  }

  if (!isLoading && !isError && books?.length > 0 && isFeatured && !search) {
    content = books
      .filter((book) => book.featured === isFeatured)
      .map((book) => <BookCard key={book.id} bookDetails={book} />);
  }

  if (!isLoading && !isError && books?.length > 0 && !isFeatured && search) {
    content = books
      .filter((book) => book.name.toLowerCase().includes(search))
      .map((book) => <BookCard key={book.id} bookDetails={book} />);
  }

  if (!isLoading && !isError && books?.length > 0 && isFeatured && search) {
    content = books
      .filter((book) => book.name.toLowerCase().includes(search))
      .filter((book) => book.featured === isFeatured)
      .map((book) => <BookCard key={book.id} bookDetails={book} />);
  }

  return (
    <main className="py-12 px-6 2xl:px-6 container">
      <div className="order-2 xl:-order-1">
        <ContentHead featured={isFeatured} featuredFunc={setIsFeatured} />
        <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
          {content}
        </div>
      </div>
    </main>
  );
}
