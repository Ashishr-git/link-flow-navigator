
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

export const GeminiKeyInput = () => {
  const [apiKey, setApiKey] = React.useState(() => localStorage.getItem('gemini_api_key') || '');

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      toast({
        title: "API Key saved",
        description: "Your Gemini API key has been saved"
      });
    }
  };

  const handleClearKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    toast({
      title: "API Key cleared",
      description: "Your Gemini API key has been removed"
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          type="password"
          placeholder="Enter your Gemini API key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <Button onClick={handleSaveKey} variant="outline">Save Key</Button>
        <Button onClick={handleClearKey} variant="outline" className="text-red-600">
          Clear Key
        </Button>
      </div>
      <p className="text-sm text-gray-500">
        Your API key will be stored locally in your browser.
      </p>
    </div>
  );
};
