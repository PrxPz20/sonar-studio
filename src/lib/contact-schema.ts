import { z } from "zod";

const optionalText = z.preprocess((value) => value === "" ? undefined : value, z.string().trim().optional());

export const contactIntents = ["Project enquiry", "Free teardown"] as const;
export type ContactIntent = (typeof contactIntents)[number];

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  businessName: z.string().trim().min(2, "Enter your business name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: optionalText,
  country: z.preprocess((value) => value === "" ? undefined : value, z.enum(["United Kingdom", "Ireland", "Cyprus", "Other"]).optional()),
  city: optionalText,
  businessType: z.preprocess((value) => value === "" ? undefined : value, z.enum(["Clinic", "Trades", "Professional services", "Hospitality", "E-commerce", "Other"]).optional()),
  need: z.string().trim().min(20, "Tell me a little more about what you need."),
  website: optionalText.refine((value) => !value || /^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(value.replace(/^https?:\/\//, "")), "Enter a website such as yourbusiness.com."),
  intent: z.preprocess((value) => value === "" ? undefined : value, z.enum(contactIntents).optional()),
  companyWebsite: z.string().max(0, "Submission blocked."),
  startedAt: z.number(),
});

export type ContactPayload = z.infer<typeof contactSchema>;
