import { connectToDB } from "@/utils/db";

export const POST = async (req: Request) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
  } catch (error) {}
};
