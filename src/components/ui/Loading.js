import React from "react";

export default function Loading() {
  return (
    <div className="book-card">
      <div className="flex-1 h-full pr-2 pt-2 flex flex-col">
        <div className="flex items-center justify-between">
          <span data-placeholder className="lws-badge"></span>
          <div className="text-gray-500 space-x-2">
            <button data-placeholder className="lws-edit "></button>
            <button data-placeholder className="lws-deleteBook"></button>
          </div>
        </div>

        <div className="space-y-2 mt-4 h-full">
          <p data-placeholder className="lws-author"></p>
          <div data-placeholder className="lws-stars"></div>
          <p data-placeholder className="lws-price"></p>
        </div>
      </div>
    </div>
  );
}
