"use client";

import React, { ChangeEventHandler, useEffect, useState } from "react";

import PromptCard from "./PromptCard";

export interface Post {
  _id: string;
  prompt: string;
  tag: string;
}

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = () => {};
  const handleTagClick = () => {};

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();

      setPosts(data);
    })();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <div className="mt-16 prompt_layout">
        {posts.map((p) => (
          <PromptCard key={p._id} post={p} handleTagClick={handleTagClick} />
        ))}
      </div>
    </section>
  );
};

export default Feed;
