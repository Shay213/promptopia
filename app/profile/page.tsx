"use client";

import React, { useCallback, useEffect, useState } from "react";
import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";
import type { Post } from "@/components/Feed";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    if (session?.user?.id) {
      (async () => {
        const res = await fetch(`/api/users/${session?.user?.id}/posts`);
        const data = await res.json();

        setPosts(data);
      })();
    }
  }, [session?.user]);

  const handleEdit = useCallback(
    (p: Post) => {
      router.push(`/update-prompt?id=${p._id}`);
    },
    [router]
  );

  const handleDelete = useCallback(
    async (p: Post) => {
      const hasConfirmed = confirm(
        "Are you sure you want to delete this prompt"
      );

      if (hasConfirmed) {
        try {
          await fetch(`/api/prompt/${p._id.toString()}`, {
            method: "DELETE",
          });

          const filteredPosts = posts.filter((post) => post._id !== p._id);
          setPosts(filteredPosts);
        } catch (error) {
          console.log(error);
        }
      }
    },
    [posts]
  );

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default UserProfile;
