import React, { useEffect, useState } from "react";
import { useAddNewBookMutation } from "../features/api/apiSlice";
import { useNavigate } from "react-router-dom";

import Success from "./ui/Success";
import Error from "./ui/Error";

export default function AddBook() {
  const [addNewBook, { isLoading, isSuccess, isError }] =
    useAddNewBookMutation();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [featured, setFeatured] = useState(false);
  const [showHide, setShowHide] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      resetForm();
      setShowHide(true);
      navigate("/");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) setShowHide(true);
  }, [isError]);

  useEffect(() => {
    if (showHide) {
      setTimeout(() => {
        setShowHide(false);
      }, 2000);
    }
  }, [showHide]);

  const handleSubmit = (e) => {
    e.preventDefault();

    addNewBook({
      name,
      author,
      thumbnail,
      price: parseInt(price),
      rating: parseInt(rating),
      featured,
    });
  };

  const resetForm = () => {
    setName("");
    setAuthor("");
    setThumbnail("");
    setPrice(0);
    setRating(0);
    setFeatured(false);
  };

  return (
    <main className="py-6 2xl:px-6">
      <div className="container">
        <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
          <h4 className="mb-8 text-xl font-bold text-center">Add New Book</h4>
          {isSuccess && showHide && (
            <Success message="The Book added successfully!" />
          )}
          {isError && showHide && <Error message="There was an error!" />}

          <form className="book-form" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="lws-bookName">Book Name</label>
              <input
                required
                className="text-input"
                type="text"
                id="lws-bookName"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="lws-author">Author</label>
              <input
                required
                className="text-input"
                type="text"
                id="lws-author"
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="lws-thumbnail">Image Url</label>
              <input
                required
                className="text-input"
                type="text"
                id="lws-thumbnail"
                name="thumbnail"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-8 pb-4">
              <div className="space-y-2">
                <label htmlFor="lws-price">Price</label>
                <input
                  required
                  className="text-input"
                  type="number"
                  id="lws-price"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="lws-rating">Rating</label>
                <input
                  required
                  className="text-input"
                  type="number"
                  id="lws-rating"
                  name="rating"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="lws-featured"
                type="checkbox"
                name="featured"
                className="w-4 h-4"
                onChange={() => setFeatured(!featured)}
                checked={featured}
              />
              <label htmlFor="lws-featured" className="ml-2 text-sm">
                {" "}
                This is a featured book{" "}
              </label>
            </div>

            <button
              type="submit"
              className="submit"
              id="lws-submit"
              disabled={isLoading}
            >
              Add Book
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
