import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { api, type LegalRequest, ApiError } from "@/src/lib/api";
import { FiCheckCircle, FiLoader } from "react-icons/fi";
import { useGSAPFadeIn } from "@/src/hooks/use-gsap-fade-in";
import { useToast } from "@/src/hooks/use-toast";

const legalSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  issue_type: z.string().min(1, "Please select an issue type"),
  property_detail: z.string().optional(),
  request_details: z.string().min(10, "Please provide at least 10 characters"),
});

type LegalFormValues = z.infer<typeof legalSchema>;

interface LegalFormProps {
  onSuccess?: (data: { id: number; message: string }) => void;
}

export function LegalForm({ onSuccess }: LegalFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<{ id: number; message: string } | null>(null);
  const [apiErrors, setApiErrors] = useState<Record<string, string[]>>({});
  const formRef = useGSAPFadeIn({ y: 20, duration: 0.6 });
  const { toast } = useToast();

  const form = useForm<LegalFormValues>({
    resolver: zodResolver(legalSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      issue_type: "",
      property_detail: "",
      request_details: "",
    },
  });

  const onSubmit = async (data: LegalFormValues) => {
    setIsSubmitting(true);
    setApiErrors({});
    try {
      const requestData: LegalRequest = {
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        issue_type: data.issue_type,
        property_detail: data.property_detail || undefined,
        request_details: data.request_details,
      };

      const response = await api.submitLegalRequest(requestData);
      setSubmitSuccess(response);
      form.reset();
      toast({
        title: "Legal Advisory Request Submitted",
        description: response.message || "A legal expert will contact you within 24 hours.",
      });
      onSuccess?.(response);
    } catch (error) {
      console.error("Error submitting legal request:", error);
      
      if (error instanceof ApiError) {
        // Handle API validation errors
        if (error.errors && Object.keys(error.errors).length > 0) {
          setApiErrors(error.errors);
          // Set form errors for each field
          Object.entries(error.errors).forEach(([field, messages]) => {
            const fieldName = field as keyof LegalFormValues;
            form.setError(fieldName, {
              type: "server",
              message: messages[0] || "Invalid value",
            });
          });
          toast({
            title: "Validation Error",
            description: error.message || "Please check the form and try again.",
            variant: "destructive",
          });
        } else {
          // General API error
          toast({
            title: "Error",
            description: error.message || "Failed to submit legal advisory request. Please try again.",
            variant: "destructive",
          });
        }
      } else {
        // Network or unknown error
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please check your connection and try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="p-6 bg-accent/10 border border-accent/20 rounded-lg" ref={formRef}>
        <div className="flex items-start gap-4">
          <FiCheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Request Submitted Successfully!</h3>
            <p className="text-muted-foreground mb-4">{submitSuccess.message}</p>
            <p className="text-sm text-muted-foreground mb-4">
              Reference ID: <span className="font-mono font-semibold">{submitSuccess.id}</span>
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setSubmitSuccess(null)}
              >
                Submit Another Request
              </Button>
              <Button
                variant="default"
                onClick={() => window.location.href = "/services"}
              >
                View Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" ref={formRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Full Name <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+232 XX XXX XXXX" {...field} />
              </FormControl>
              <FormDescription>Optional - for faster communication</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="issue_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Issue Type <span className="text-destructive">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Property Dispute">Property Dispute</SelectItem>
                  <SelectItem value="Property Title & Ownership">Property Title & Ownership</SelectItem>
                  <SelectItem value="Contracts & Agreements">Contracts & Agreements</SelectItem>
                  <SelectItem value="Dispute Resolution">Dispute Resolution</SelectItem>
                  <SelectItem value="Building Permits & Compliance">Building Permits & Compliance</SelectItem>
                  <SelectItem value="Zoning & Land Use">Zoning & Land Use</SelectItem>
                  <SelectItem value="Liability & Insurance">Liability & Insurance</SelectItem>
                  <SelectItem value="Other Legal Matter">Other Legal Matter</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="property_detail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Detail</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Plot No. 123, Main Street, Freetown" {...field} />
              </FormControl>
              <FormDescription>Optional - if related to a specific property</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="request_details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Request Details <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please describe your legal issue, questions, or concerns in detail..."
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormDescription>Minimum 10 characters. Be as specific as possible.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <FiLoader className="animate-spin mr-2" />
              Submitting...
            </>
          ) : (
            "Book a Consultation"
          )}
        </Button>
      </form>
    </Form>
  );
}

