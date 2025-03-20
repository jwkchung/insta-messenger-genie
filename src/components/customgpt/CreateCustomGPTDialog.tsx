
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CustomGPTForm, CustomGPTFormValues } from './CustomGPTForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface CreateCustomGPTDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCustomGPTDialog({ open, onOpenChange }: CreateCustomGPTDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: CustomGPTFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock success
    toast.success(`Custom GPT "${values.name}" created successfully!`);
    setIsSubmitting(false);
    onOpenChange(false);
    
    // Navigate to the custom GPT page
    navigate('/customgpt');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <span className="bg-primary/10 p-2 rounded-full mr-2">
              <span className="text-primary text-sm">✨</span>
            </span>
            Create Custom GPT
          </DialogTitle>
          <DialogDescription>
            Create a customized GPT with specific instructions and reference materials.
          </DialogDescription>
        </DialogHeader>
        
        <CustomGPTForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </DialogContent>
    </Dialog>
  );
}
