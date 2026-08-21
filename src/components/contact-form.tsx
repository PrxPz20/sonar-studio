"use client";

import { FormEvent, type FocusEvent, useState } from "react";
import Link from "next/link";
import { contactSchema, type ContactTier } from "@/lib/contact-schema";

type Errors = Record<string, string>;

const labels: Record<string, string> = {
  name: "Enter your name.", businessName: "Enter your business name.", email: "Enter a valid email address.",
  country: "Choose your country.", city: "Enter your city.", businessType: "Choose your business type.",
  need: "Tell me a little more about what you need.", website: "Enter a website such as yourbusiness.com.",
  budget: "Choose a budget range.",
};

function formPayload(form: HTMLFormElement, startedAt: number) {
  const data = new FormData(form);
  return {
    name: String(data.get("name") || ""), businessName: String(data.get("businessName") || ""),
    email: String(data.get("email") || ""), phone: String(data.get("phone") || ""),
    country: String(data.get("country") || ""), city: String(data.get("city") || ""),
    businessType: String(data.get("businessType") || ""), need: String(data.get("need") || ""),
    website: String(data.get("website") || ""), budget: String(data.get("budget") || ""),
    tier: String(data.get("tier") || "") || undefined,
    companyWebsite: String(data.get("companyWebsite") || ""), startedAt,
  };
}

export function ContactForm({ selectedTier }: { selectedTier?: ContactTier }) {
  const [startedAt] = useState(() => Date.now());
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  function validateField(element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
    const name = element.name;
    let message = "";
    if (element.required && !element.value.trim()) message = labels[name] || "Complete this field.";
    else if (name === "email" && !element.validity.valid) message = labels.email;
    else if (name === "need" && element.value.trim().length < 20) message = labels.need;
    else if (name === "website" && element.value && !/^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(element.value.replace(/^https?:\/\//, ""))) message = labels.website;
    setErrors((current) => ({ ...current, [name]: message }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    const form = event.currentTarget;
    const payload = formPayload(form, startedAt);
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const next: Errors = {};
      parsed.error.issues.forEach((issue) => { next[String(issue.path[0])] = issue.message; });
      setErrors(next);
      form.querySelector<HTMLElement>(`[name="${String(parsed.error.issues[0]?.path[0])}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data),
      });
      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const field = (name: string) => ({
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    onBlur: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => validateField(event.currentTarget),
  });
  const error = (name: string) => errors[name] ? <p className="field-error" id={`${name}-error`}>{errors[name]}</p> : null;

  return (
    <div className="contact-form-shell">
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {status === "sending" && "Sending your details. Please wait."}
        {status === "success" && "Your details were sent successfully. Check your inbox."}
      </p>
      <p className="sr-only" role="alert" aria-live="assertive" aria-atomic="true">
        {status === "error" && "Your details could not be sent. Email hello@sonarstudio.net instead."}
      </p>
      {status === "success" ? (
        <div className="form-success" aria-labelledby="form-success-title">
          <span className="success-mark" aria-hidden="true">✓</span>
          <h2 id="form-success-title">Got it. Check your inbox.</h2>
          <p>Thanks for reaching out. I'll reply personally, usually within a day. If it's a good fit, I'll send you a free three-minute teardown of your current visibility.</p>
          <Link href="/">Back to home →</Link>
        </div>
      ) : (
        <form className="contact-form" noValidate onSubmit={submit} aria-busy={status === "sending"}>
          {selectedTier && (
            <div className="selected-tier">
              <div><span>Selected scope</span><strong>{selectedTier}</strong></div>
              <Link href="/services">Change scope</Link>
              <input type="hidden" name="tier" value={selectedTier} />
            </div>
          )}
          <div className="form-grid">
        <label><span>Name <b>Required</b></span><input name="name" autoComplete="name" required {...field("name")} />{error("name")}</label>
        <label><span>Business name <b>Required</b></span><input name="businessName" autoComplete="organization" required {...field("businessName")} />{error("businessName")}</label>
        <label><span>Email <b>Required</b></span><input name="email" type="email" autoComplete="email" required {...field("email")} />{error("email")}</label>
        <label><span>Phone <b>Optional</b></span><input name="phone" type="tel" autoComplete="tel" {...field("phone")} />{error("phone")}</label>
        <label><span>Country <b>Required</b></span><select name="country" required defaultValue="" {...field("country")}><option value="" disabled>Select country</option><option>United Kingdom</option><option>Ireland</option><option>Cyprus</option><option>Other</option></select>{error("country")}</label>
        <label><span>City <b>Required</b></span><input name="city" autoComplete="address-level2" required {...field("city")} />{error("city")}</label>
        <label><span>Business type <b>Required</b></span><select name="businessType" required defaultValue="" {...field("businessType")}><option value="" disabled>Select type</option><option>Clinic</option><option>Trades</option><option>Professional services</option><option>Hospitality</option><option>E-commerce</option><option>Other</option></select>{error("businessType")}</label>
        <label className="field-wide"><span>What do you need? <b>Required</b></span><textarea name="need" required rows={6} placeholder="A new website, an optimisation of your current one, or you're not sure yet — tell me in your own words." {...field("need")} />{error("need")}</label>
        <label className="field-wide"><span>Current website url <b>Optional</b></span><input name="website" inputMode="url" placeholder="yourbusiness.com (if you have one)" {...field("website")} />{error("website")}</label>
        <label className="field-wide"><span>Budget range <b>Required</b></span><select name="budget" required defaultValue="" {...field("budget")}><option value="" disabled>Select range</option><option>Under €2,000</option><option>€2,000–3,500</option><option>€3,500–6,000</option><option>€6,000+</option><option>Not sure yet</option></select>{error("budget")}</label>
          </div>
          <label className="honeypot" aria-hidden="true">Company website<input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label>
          {status === "error" && <p className="form-error">Something went wrong. Email me directly at <a href="mailto:hello@sonarstudio.net">hello@sonarstudio.net</a> and I'll pick it up straight away.</p>}
          <button className="submit-button" type="submit" disabled={status === "sending"}>
            <span>{status === "sending" ? "Sending your details" : "Send and get my teardown"}</span><span aria-hidden="true">→</span>
          </button>
          <p className="form-privacy">No sales calls. No spam. Your details stay with me.</p>
        </form>
      )}
    </div>
  );
}
