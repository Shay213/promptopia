import { connectToDB } from "@/utils/db";
import Prompt from "@/models/prompt";

interface Params {
  params: {
    id: string;
  };
}

export const GET = async (req: Request, { params }: Params) => {
  const { id } = params;
  try {
    await connectToDB();

    const prompt = await Prompt.findById(id).populate("creator");

    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

export const PATCH = async (req: Request, { params }: Params) => {
  const { prompt, tag } = await req.json();
  const { id } = params;
  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(id);

    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: Params) => {
  const { id } = params;

  try {
    await connectToDB();

    await Prompt.findByIdAndRemove(id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};
