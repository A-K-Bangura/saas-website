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
import { api, type EstimateRequest, ApiError } from "@/src/lib/api";
import { FiCheckCircle, FiLoader } from "react-icons/fi";
import { useGSAPFadeIn } from "@/src/hooks/use-gsap-fade-in";
import { useToast } from "@/src/hooks/use-toast";

const estimateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  project_title: z.string().min(1, "Project title is required"),
  location: z.string().min(2, "Location is required"),
  description: z.string().min(10, "Please provide at least 10 characters"),
  estimate_size: z.number().optional().or(z.string().transform((val) => val ? Number(val) : undefined)),
  estimate_size_unit: z.string().optional(),
  budget_range_min: z.number().optional().or(z.string().transform((val) => val ? Number(val) : undefined)),
  budget_range_max: z.number().optional().or(z.string().transform((val) => val ? Number(val) : undefined)),
  brief_description: z.string().optional(),
  attachments: z.instanceof(FileList).optional(),
});

type EstimateFormValues = z.infer<typeof estimateSchema>;

interface EstimateFormProps {
  onSuccess?: (data: { id: number; message: string }) => void;
}

export function EstimateForm({ onSuccess }: EstimateFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<{ id: number; message: string } | null>(null);
  const [apiErrors, setApiErrors] = useState<Record<string, string[]>>({});
  const formRef = useGSAPFadeIn({ y: 20, duration: 0.6 });
  const { toast } = useToast();

  const form = useForm<EstimateFormValues>({
    resolver: zodResolver(estimateSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      project_title: "",
      location: "",
      description: "",
      estimate_size: undefined,
      estimate_size_unit: "sqm",
      budget_range_min: undefined,
      budget_range_max: undefined,
      brief_description: "",
    },
  });

  const onSubmit = async (data: EstimateFormValues) => {
    setIsSubmitting(true);
    setApiErrors({});
    try {
      const requestData: EstimateRequest = {
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        project_title: data.project_title,
        location: data.location,
        description: data.description,
        estimate_size: typeof data.estimate_size === 'number' ? data.estimate_size : undefined,
        estimate_size_unit: data.estimate_size_unit || undefined,
        budget_range_min: typeof data.budget_range_min === 'number' ? data.budget_range_min : undefined,
        budget_range_max: typeof data.budget_range_max === 'number' ? data.budget_range_max : undefined,
        brief_description: data.brief_description || undefined,
        attachments: data.attachments ? Array.from(data.attachments) : undefined,
      };

      const response = await api.submitEstimate(requestData);
      setSubmitSuccess(response);
      form.reset();
      toast({
        title: "Estimate Request Submitted",
        description: response.message || "We will contact you within 48 hours.",
      });
      onSuccess?.(response);
    } catch (error) {
      console.error("Error submitting estimate:", error);
      
      if (error instanceof ApiError) {
        // Handle API validation errors
        if (error.errors && Object.keys(error.errors).length > 0) {
          setApiErrors(error.errors);
          // Set form errors for each field
          Object.entries(error.errors).forEach(([field, messages]) => {
            const fieldName = field as keyof EstimateFormValues;
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
            description: error.message || "Failed to submit estimate request. Please try again.",
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
          name="project_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Project Title <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="e.g., Residential House Construction" {...field} />
              </FormControl>
              <FormDescription>Give your project a descriptive title</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Location <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Freetown, Sierra Leone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="estimate_size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated Size</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g., 150"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="estimate_size_unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || "sqm"}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sqm">Square Meters (sqm)</SelectItem>
                    <SelectItem value="sqft">Square Feet (sqft)</SelectItem>
                    <SelectItem value="acres">Acres</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-end">
            <FormDescription className="mb-2">Optional - approximate project size</FormDescription>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="budget_range_min"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget Range (Min)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g., 50000"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>Optional - minimum budget</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budget_range_max"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget Range (Max)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g., 100000"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>Optional - maximum budget</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Project Description <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your project, requirements, and any specific needs..."
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormDescription>Minimum 10 characters</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brief_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brief Description (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any additional brief notes..."
                  className="min-h-24"
                  {...field}
                />
              </FormControl>
              <FormDescription>Optional - any additional brief notes</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="attachments"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Attach Files (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  {...field}
                  onChange={(e) => onChange(e.target.files)}
                />
              </FormControl>
              <FormDescription>PDF, DOC, or images (max 10MB each)</FormDescription>
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
            "Request Free Estimate"
          )}
        </Button>
      </form>
    </Form>
  );
}

