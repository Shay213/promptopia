"use client";

import React, { useCallback, useEffect, useState } from "react";
import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";
import type { Post } from "@/components/Feed";

const UserProfile = () => {
  const { data: session } = useSession();
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

  const handleEdit = useCallback(() => {}, []);

  const handleDelete = useCallback(async () => {}, []);

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
