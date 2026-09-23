"use client";

import React, { useState, useTransition } from "react";
import { z } from "zod";
import { submitLeadAction } from "@/actions/leads";
import { trackEventAction } from "@/actions/analytics";
import { InputField } from "@/components/ui/input-field";
import { SelectField } from "@/components/ui/select-field";
import { TextareaField } from "@/components/ui/textarea-field";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Send, Loader2 } from "lucide-react";

const leadSchema = z.object({
  name: z.string().min(2, "Please enter your full name (at least 2 characters)."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  typology: z.string().min(1, "Please select a building typology."),
  location: z.string().optional(),
  estimatedBudget: z.string().optional(),
  message: z.string().min(10, "Please provide a brief message describing your site or project (at least 10 characters)."),
});

type LeadFormData = z.infer<typeof leadSchema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    email: "",
    phone: "",
    typology: "Contemporary Residential Duplex",
    location: "",
    estimatedBudget: "",
    message: "",
  });

  const handleChange = (field: keyof LeadFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate with Zod
    const result = leadSchema.safeParse(formData);
    if (!result.success) {
      const errors: Partial<Record<keyof LeadFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof LeadFormData;
        if (field && !errors[field]) {
          errors[field] = issue.message;
        }
      });
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});

    startTransition(async () => {
      const res = await submitLeadAction({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        typology: formData.typology,
        location: formData.location || undefined,
        estimatedBudget: formData.estimatedBudget || undefined,
        message: formData.message,
      });

      if (res.success) {
        setSubmitted(true);
      } else {
        setError(res.error || "Failed to submit inquiry. Please try WhatsApp directly.");
      }
    });
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C9A84C]/10 text-[#C9A84C]">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-[#F9F6F0]">
          Inquiry Received
        </h3>
        <p className="text-sm text-[#8A8A8A] max-w-md font-mono">
          Thank you for contacting DIZTINCT TOUCH HOME DESIGN. Mayowa and our team will review your project parameters and get in touch within 24 hours.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: "",
              email: "",
              phone: "",
              typology: "Contemporary Residential Duplex",
              location: "",
              estimatedBudget: "",
              message: "",
            });
          }}
          className="mt-4"
        >
          Send Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Your Full Name"
          required
          placeholder="e.g. Tunde Adeyemi"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          errorMessage={fieldErrors.name}
        />

        <InputField
          label="Email Address"
          type="email"
          required
          placeholder="e.g. tunde@example.com"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          errorMessage={fieldErrors.email}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Phone / WhatsApp"
          type="tel"
          placeholder="e.g. 08012345678"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          errorMessage={fieldErrors.phone}
        />

        <InputField
          label="Site Location / City"
          placeholder="e.g. Ibadan, Lagos, Abuja, or Diaspora"
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
          errorMessage={fieldErrors.location}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField
          label="Project Typology"
          value={formData.typology}
          onChange={(e) => handleChange("typology", e.target.value)}
          errorMessage={fieldErrors.typology}
          options={[
            { value: "Contemporary Residential Duplex", label: "Contemporary Residential Duplex" },
            { value: "Bespoke Private Villa / Residence", label: "Bespoke Private Villa / Residence" },
            { value: "Executive Contemporary Bungalow", label: "Executive Contemporary Bungalow" },
            { value: "Commercial / Office Development", label: "Commercial / Office Development" },
            { value: "Photorealistic 3D Visualization Only", label: "Photorealistic 3D Visualization Only" },
            { value: "2D Working Drawings & Approvals", label: "2D Working Drawings & Approvals" },
            { value: "Construction-Stage Site Oversight", label: "Construction-Stage Site Oversight" },
          ]}
        />

        <InputField
          label="Estimated Budget Bracket"
          placeholder="e.g. ₦35M - ₦60M or Under discussion"
          value={formData.estimatedBudget}
          onChange={(e) => handleChange("estimatedBudget", e.target.value)}
          errorMessage={fieldErrors.estimatedBudget}
        />
      </div>

      <TextareaField
        label="Project Brief & Requirements"
        required
        rows={5}
        placeholder="Describe your property, number of bedrooms, site status (land purchased, foundation, or planning), desired timeline, and scope needed..."
        value={formData.message}
        onChange={(e) => handleChange("message", e.target.value)}
        errorMessage={fieldErrors.message}
      />

      <Button
        type="submit"
        disabled={isPending}
        className="w-full h-12 text-sm font-semibold"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Sending to Mayowa...</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            <span>Submit Project Inquiry to Mayowa</span>
          </>
        )}
      </Button>
    </form>
  );
}
