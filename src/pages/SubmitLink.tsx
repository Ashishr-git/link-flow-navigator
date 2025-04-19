import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Loader2, Upload, Wand2, FileImage, X } from "lucide-react";
import React from "react";
import { analyzeImage } from "@/api/analyzeImage";

const submitSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  keywords: z.string().min(3, { message: "Please add at least one keyword" }),
  platform: z.string().min(1, { message: "Please select a platform" }),
  product: z.string().min(1, { message: "Please enter a product" }),
  subproduct: z.string().optional(),
});

type SubmitFormValues = z.infer<typeof submitSchema>;

const SubmitLink = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const form = useForm<SubmitFormValues>({
    resolver: zodResolver(submitSchema),
    defaultValues: {
      url: "",
      description: "",
      keywords: "",
      platform: "Web",
      product: "",
      subproduct: "",
    },
  });
  
  const onSubmit = async (values: SubmitFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Link submitted successfully",
        description: "Your link has been sent for approval",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error submitting link",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateFromScreenshot = async () => {
    if (!selectedFile) {
      toast({
        title: "No image selected",
        description: "Please select an image first",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      console.log('Starting image analysis for file:', selectedFile.name);
      const result = await analyzeImage(selectedFile);
      
      // Update form fields with the generated data
      form.setValue('description', result.description);
      form.setValue('platform', result.platform);
      form.setValue('product', result.product);
      form.setValue('subproduct', result.subproduct || '');
      form.setValue('keywords', result.tags);

      toast({
        title: "Details generated successfully",
        description: "The form has been filled with AI-generated details",
      });
    } catch (error) {
      console.error('Error in handleGenerateFromScreenshot:', error);
      let errorMessage = "Failed to analyze the image. Please try again.";
      
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          errorMessage = "Gemini API key is not configured. Please check your .env file.";
        } else {
          errorMessage = error.message;
        }
      }

      toast({
        title: "Error generating details",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        toast({
          title: "File selected",
          description: `${file.name} has been selected`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
      }
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Submit New Link</h1>
        <p className="text-gray-600">Register a new navigation link for approval</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PlusCircle className="h-5 w-5 mr-2 text-blue-600" />
            Link Details
          </CardTitle>
          <CardDescription>
            Please provide accurate information for the review process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL*</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/page" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description*</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Provide a detailed description of the link"
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Platform*</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          {...field}
                        >
                          <option value="Web">Web</option>
                          <option value="Mobile">Mobile</option>
                          <option value="Desktop">Desktop</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Keywords*</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. dashboard, analytics (comma separated)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="product"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product*</FormLabel>
                      <FormControl>
                        <Input placeholder="Product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subproduct"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subproduct</FormLabel>
                      <FormControl>
                        <Input placeholder="Subproduct (optional)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm font-medium mb-2">Screenshot (optional)</p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    className="hidden"
                  />
                  {selectedFile ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileImage className="h-5 w-5 text-gray-500" />
                          <span className="text-sm">{selectedFile.name}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleRemoveFile}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full flex items-center justify-center gap-2"
                        onClick={handleGenerateFromScreenshot}
                        disabled={isGenerating}
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Generating Details...
                          </>
                        ) : (
                          <>
                            <Wand2 className="h-4 w-4" />
                            Generate Details
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-4">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <p className="text-sm text-gray-500 text-center">
                        Drag & drop a screenshot or click below
                      </p>
                      <div className="flex gap-2">
                        <Button type="button" variant="outline" onClick={handleBrowseClick}>
                          Browse Files
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button type="button" variant="outline" onClick={() => navigate("/")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit for Approval
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmitLink;
