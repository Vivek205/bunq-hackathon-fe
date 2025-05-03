"use server";

import { z } from "zod";

const conversationSchema = z.object({
  userMessage: z.string(),
});

export const submitUserMessage = async (data: FormData) => {
  console.log("submitAction", data);
  await new Promise((res) =>
    setTimeout(() => {
      res(undefined);
    }, 1000)
  );
  const formData = Object.fromEntries(data);
  const validatedFormData = conversationSchema.safeParse(formData);
  console.log("validatedFormData", validatedFormData);
  if (!validatedFormData.success) {
    const formFieldErrors = validatedFormData.error.flatten().fieldErrors;

    return {
      success: false,
      errors: {
        userMessage: formFieldErrors.userMessage,
      },
    };
  }

  const url = new URL(process.env.NEXT_PUBLIC_AI_API_URL!);
  url.searchParams.set("query", validatedFormData.data.userMessage);
  let response = await fetch(url);
  response = await response.json();
  console.log("response", response);

  return {
    success: true,
    message: {
      sender: "assistant",
      content: response,
    },
  };
};
