import React from "react";
import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../features/api/apiSlice";
import EditForm from "./form/EditForm";

export default function EditBook() {
  const { bookId } = useParams();
  const { data: book, isLoading, isError } = useGetBookQuery(bookId);

  return (
    <main className="py-6 2xl:px-6">
      <div className="container">
        {!isLoading && !isError && <EditForm bookDetails={book} />}
      </div>
    </main>
  );
}
