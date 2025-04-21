
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface GeminiKeyInputProps {
  onKeySubmit: (key: string) => void;
}

export const GeminiKeyInput = ({ onKeySubmit }: GeminiKeyInputProps) => {
  const [apiKey, setApiKey] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      onKeySubmit(apiKey.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 my-2 text-sm">
      <Input
        type="password"
        placeholder="Enter Gemini API key to generate"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="max-w-[300px]"
      />
      <Button type="submit" variant="outline" size="sm">
        Use Key
      </Button>
    </form>
  );
};
