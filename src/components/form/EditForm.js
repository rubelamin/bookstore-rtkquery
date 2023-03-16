import React, { useState, useEffect } from "react";
import { useEditBookMutation } from "../../features/api/apiSlice";
import { useNavigate } from "react-router-dom";

import Error from "../ui/Error";
import Success from "../ui/Success";

export default function EditForm({ bookDetails }) {
  const {
    id,
    name: initialName,
    author: initialAthor,
    thumbnail: initialThumbnail,
    price: initialPrice,
    rating: initialRating,
    featured: initialFeatured,
  } = bookDetails;

  const [editBook, { isLoading, isError, isSuccess }] = useEditBookMutation();

  const [name, setName] = useState(initialName);
  const [author, setAuthor] = useState(initialAthor);
  const [thumbnail, setThumbnail] = useState(initialThumbnail);
  const [price, setPrice] = useState(initialPrice);
  const [rating, setRating] = useState(initialRating);
  const [featured, setFeatured] = useState(initialFeatured);
  const [showHide, setShowHide] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
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

    editBook({
      id,
      data: {
        name,
        author,
        thumbnail,
        price,
        rating,
        featured,
      },
    });
  };

  //   const resetForm = () => {
  //     setName("");
  //     setAuthor("");
  //     setThumbnail("");
  //     setPrice(0);
  //     setRating(0);
  //     setFeatured(false);
  //   };

  return (
    <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
      <h4 className="mb-8 text-xl font-bold text-center">Edit Book</h4>

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
          Edit Book
        </button>
      </form>
    </div>
  );
}
