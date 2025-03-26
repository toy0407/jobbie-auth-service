import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
});

export const RequestOtpSchemas = {
  bodySchema,
};
