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
import { api, type ConsultancyRequest, ApiError } from "@/src/lib/api";
import { FiCheckCircle, FiLoader } from "react-icons/fi";
import { useGSAPFadeIn } from "@/src/hooks/use-gsap-fade-in";
import { useToast } from "@/src/hooks/use-toast";

const consultancySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  consultancy_type: z.string().min(1, "Please select a consultancy type"),
  preferred_date: z.string().optional(),
  request_details: z.string().min(10, "Please provide at least 10 characters"),
});

type ConsultancyFormValues = z.infer<typeof consultancySchema>;

interface ConsultancyFormProps {
  onSuccess?: (data: { id: number; message: string }) => void;
}

export function ConsultancyForm({ onSuccess }: ConsultancyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<{ id: number; message: string } | null>(null);
  const [apiErrors, setApiErrors] = useState<Record<string, string[]>>({});
  const formRef = useGSAPFadeIn({ y: 20, duration: 0.6 });
  const { toast } = useToast();

  const form = useForm<ConsultancyFormValues>({
    resolver: zodResolver(consultancySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      consultancy_type: "",
      preferred_date: "",
      request_details: "",
    },
  });

  const onSubmit = async (data: ConsultancyFormValues) => {
    setIsSubmitting(true);
    setApiErrors({});
    try {
      const requestData: ConsultancyRequest = {
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        consultancy_type: data.consultancy_type,
        preferred_date: data.preferred_date || undefined,
        request_details: data.request_details,
      };

      const response = await api.submitConsultancyRequest(requestData);
      setSubmitSuccess(response);
      form.reset();
      toast({
        title: "Consultancy Request Submitted",
        description: response.message || "Our team will contact you soon.",
      });
      onSuccess?.(response);
    } catch (error) {
      console.error("Error submitting consultancy request:", error);
      
      if (error instanceof ApiError) {
        // Handle API validation errors
        if (error.errors && Object.keys(error.errors).length > 0) {
          setApiErrors(error.errors);
          // Set form errors for each field
          Object.entries(error.errors).forEach(([field, messages]) => {
            const fieldName = field as keyof ConsultancyFormValues;
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
            description: error.message || "Failed to submit consultancy request. Please try again.",
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
              <FormDescription>Optional - for scheduling purposes</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consultancy_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Consultancy Type <span className="text-destructive">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select consultancy type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Architectural Design">Architectural Design</SelectItem>
                  <SelectItem value="Structural Engineering">Structural Engineering</SelectItem>
                  <SelectItem value="Project Management">Project Management</SelectItem>
                  <SelectItem value="Cost Estimation">Cost Estimation</SelectItem>
                  <SelectItem value="Sustainability & Green Building">Sustainability & Green Building</SelectItem>
                  <SelectItem value="Feasibility Studies">Feasibility Studies</SelectItem>
                  <SelectItem value="Regulatory Compliance">Regulatory Compliance</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preferred_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Consultation Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>Optional - we'll confirm availability</FormDescription>
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
                  placeholder="Tell us about your project, what consultancy services you need, and any specific questions or challenges..."
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormDescription>Minimum 10 characters</FormDescription>
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
            "Request Consultation"
          )}
        </Button>
      </form>
    </Form>
  );
}

