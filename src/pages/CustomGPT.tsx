
import React, { useState } from 'react';
import { Plus, Sparkles, Settings, Trash2 } from 'lucide-react';
import Dashboard from '@/components/layout/Dashboard';
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateCustomGPTDialog } from '@/components/customgpt/CreateCustomGPTDialog';
import { toast } from 'sonner';

interface CustomGPT {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  instructions: string;
  fileCount: number;
}

const CustomGPT = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [customGPTs, setCustomGPTs] = useState<CustomGPT[]>([
    {
      id: '1',
      name: 'Marketing Expert',
      description: 'Specialized in digital marketing strategies',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      instructions: 'You are a marketing expert specialized in social media marketing. Help create compelling content strategies...',
      fileCount: 2
    },
    {
      id: '2',
      name: 'Data Analyst',
      description: 'Helps analyze and visualize data',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      instructions: 'You are a data analyst with expertise in data visualization and statistical analysis...',
      fileCount: 5
    }
  ]);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      setCustomGPTs(prev => prev.filter(gpt => gpt.id !== id));
      toast.success(`"${name}" has been deleted.`);
    }
  };

  const handleUse = (name: string) => {
    toast(`Started conversation with "${name}"`, {
      description: "In a real app, this would open a chat with your custom GPT.",
      action: {
        label: "Open",
        onClick: () => console.log(`Using ${name}`),
      },
    });
  };

  return (
    <AnimatedTransition>
      <Dashboard>
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <Sparkles className="w-6 h-6 mr-2" />
                Custom GPTs
              </h1>
              <p className="text-muted-foreground mt-1">
                Create and manage customized GPT assistants for specific tasks
              </p>
            </div>
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Custom GPT
            </Button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customGPTs.map((gpt) => (
              <Card key={gpt.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{gpt.name}</CardTitle>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Settings">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                        title="Delete"
                        onClick={() => handleDelete(gpt.id, gpt.name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {gpt.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3 text-sm">
                  <div className="flex justify-between text-muted-foreground mb-2">
                    <span>Created {gpt.createdAt.toLocaleDateString()}</span>
                    <span>{gpt.fileCount} {gpt.fileCount === 1 ? 'file' : 'files'}</span>
                  </div>
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Instructions:</span> {gpt.instructions}
                  </p>
                </CardContent>
                <CardFooter className="pt-3">
                  <Button 
                    className="w-full" 
                    variant="secondary"
                    onClick={() => handleUse(gpt.name)}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Chat with {gpt.name}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {customGPTs.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Custom GPTs yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Create your first custom GPT with specific instructions and knowledge to help with specialized tasks.
              </p>
              <Button onClick={() => setCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create your first Custom GPT
              </Button>
            </div>
          )}
        </div>
      </Dashboard>
      
      <CreateCustomGPTDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen} 
      />
    </AnimatedTransition>
  );
};

export default CustomGPT;
