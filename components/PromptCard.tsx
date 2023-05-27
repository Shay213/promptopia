import React from "react";
import { Post } from "./Feed";

interface PromptCardProps {
  post: Post;
  handleTagClick: any;
}

const PromptCard = ({ post, handleTagClick }: PromptCardProps) => {
  return <div>PromptCard</div>;
};

export default PromptCard;
