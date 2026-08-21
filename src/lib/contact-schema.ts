import { z } from "zod";

const optionalText = z.preprocess((value) => value === "" ? undefined : value, z.string().trim().optional());

export const contactTiers = ["Essential", "Standard", "Premium"] as const;
export type ContactTier = (typeof contactTiers)[number];

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  businessName: z.string().trim().min(2, "Enter your business name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: optionalText,
  country: z.enum(["United Kingdom", "Ireland", "Cyprus", "Other"], { message: "Choose your country." }),
  city: z.string().trim().min(2, "Enter your city."),
  businessType: z.enum(["Clinic", "Trades", "Professional services", "Hospitality", "E-commerce", "Other"], { message: "Choose your business type." }),
  need: z.string().trim().min(20, "Tell me a little more about what you need."),
  website: optionalText.refine((value) => !value || /^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(value.replace(/^https?:\/\//, "")), "Enter a website such as yourbusiness.com."),
  budget: z.enum(["Under €2,000", "€2,000–3,500", "€3,500–6,000", "€6,000+", "Not sure yet"], { message: "Choose a budget range." }),
  tier: z.preprocess((value) => value === "" ? undefined : value, z.enum(contactTiers).optional()),
  companyWebsite: z.string().max(0, "Submission blocked."),
  startedAt: z.number(),
});

export type ContactPayload = z.infer<typeof contactSchema>;
