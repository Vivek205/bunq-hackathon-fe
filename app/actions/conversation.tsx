"use server";

import { z } from "zod";

// TODO: Add type for conversation
const conversation: any[] = [];

const conversationSchema = z.object({
  userMessage: z.string(),
});

export const submitUserMessage = async (data: FormData) => {
  console.log("submitAction", data);
  const formData = Object.fromEntries(data);
  const validatedFormData = conversationSchema.safeParse(formData);

  if (!validatedFormData.success) {
    const formFieldErrors = validatedFormData.error.flatten().fieldErrors;

    return {
      errors: {
        userMessage: formFieldErrors.userMessage,
      },
    };
  }

  conversation.push({ role: "user", message: formData.userMessage });
  conversation.push({ role: "system", message: "sample system response" });

  return {
    success: "Successful response",
    // conversation,
  };
};
