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
      errors: {
        userMessage: formFieldErrors.userMessage,
      },
    };
  }

  return {
    success: "Successful response",
  };
};
