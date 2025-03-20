
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { AlertCircle, Sparkles, Upload } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  instructions: z.string().min(20, {
    message: "Instructions must be at least 20 characters.",
  }),
});

export type CustomGPTFormValues = z.infer<typeof formSchema>;

interface CustomGPTFormProps {
  onSubmit: (values: CustomGPTFormValues) => void;
  isSubmitting?: boolean;
}

export function CustomGPTForm({ onSubmit, isSubmitting = false }: CustomGPTFormProps) {
  const form = useForm<CustomGPTFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      instructions: "",
    },
  });

  const [files, setFiles] = React.useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Marketing Expert" {...field} />
              </FormControl>
              <FormDescription>
                A name for your custom GPT.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input 
                  placeholder="An assistant that helps with marketing strategies" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                A brief description of what this custom GPT does.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="You are a marketing expert specialized in social media marketing. You help create compelling content strategies..." 
                  className="min-h-32"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Detailed instructions for the GPT to follow. Be specific about its role, tone, and limitations.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3">
          <div>
            <FormLabel className="block mb-2">Reference Files</FormLabel>
            <div className="border-2 border-dashed border-input rounded-lg p-6 text-center">
              <input
                type="file"
                id="file-upload"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center justify-center"
              >
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <span className="text-sm font-medium mb-1">
                  Drop files here or click to upload
                </span>
                <span className="text-xs text-muted-foreground">
                  PDF, DOC, CSV, TXT (up to 10MB each)
                </span>
              </label>
            </div>
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Uploaded Files:</p>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-secondary/50 px-3 py-2 rounded-md text-sm">
                    <span className="truncate max-w-[70%]">{file.name}</span>
                    <div className="flex gap-2">
                      <span className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(0)} KB
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-destructive hover:text-destructive/90"
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800 dark:text-blue-300">
            <p className="font-medium mb-1">This is a demo feature</p>
            <p>In a real application, these instructions and files would be used to customize your GPT's behavior. The uploaded files would provide reference material for the GPT to draw upon.</p>
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin">◌</span>
              Creating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Create Custom GPT
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
