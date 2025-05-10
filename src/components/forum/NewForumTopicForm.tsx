
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

interface NewForumTopicFormProps {
  onSuccess: () => void;
}

const NewForumTopicForm: React.FC<NewForumTopicFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    tags: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Topic created",
        description: "Your forum topic has been created successfully.",
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create forum topic. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="border-legalblue-200 shadow">
      <CardHeader>
        <CardTitle>Create New Topic</CardTitle>
        <CardDescription>
          Start a new discussion in the community forum
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Topic Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter a clear, specific title for your topic"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              onValueChange={handleSelectChange('category')}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General Discussion">General Discussion</SelectItem>
                <SelectItem value="Legal Advice">Legal Advice</SelectItem>
                <SelectItem value="Career">Career</SelectItem>
                <SelectItem value="Events">Events</SelectItem>
                <SelectItem value="Court Proceedings">Court Proceedings</SelectItem>
                <SelectItem value="Announcements">Announcements</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Provide details of your discussion topic..."
              rows={8}
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              name="tags"
              placeholder="E.g., civil, supreme court, property law"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>
        
          <CardFooter className="flex justify-end px-0 pt-4">
            <Button
              type="submit"
              className="bg-legalblue-900 hover:bg-legalblue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Topic...' : 'Create Topic'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewForumTopicForm;
