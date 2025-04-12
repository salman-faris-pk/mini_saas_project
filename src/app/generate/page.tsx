'use client'

import { useState } from 'react';
import GenerateForm from '@/app/components/GenerateForm';
import GImage from '@/app/components/GImage';
import useAuth from '@/app/hooks/useAuth';
import useCredits from '../hooks/useCredits';
import CreditCounter from '../components/CreditCounter';

export default function GeneratePage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null); 
  const { credits, refreshCredits } = useCredits();
  const { user,isLoading } = useAuth();
  
  const userCredit=user?.credits;
  
  
  const handleGenerate = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (userCredit === undefined || !prompt.trim() || isGenerating || userCredit <= 0) return;
    setIsGenerating(true);
    try {
      const response = await fetch('/api/image-generation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      
      if (!response.ok) {
        throw new Error('Image generation failed');
      }

      const data = await response.json();
        setGeneratedImage(data.imageUrl || null);
         await refreshCredits();
        setIsGenerating(false);
    } catch (error) {
      console.error('Error generating images:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Generate Images</h1>
          <CreditCounter credits={credits}/>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <GenerateForm 
            prompt={prompt}
            setPrompt={setPrompt}
            isGenerating={isGenerating}
            handleGenerate={handleGenerate}
            credits={credits}
            user={user}
            loading={isLoading}
          />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {generatedImage ? 'Generated Images' : 'Your images will appear here'}
          </h2>
          <GImage image={generatedImage} ISgenerating={isGenerating}/>
        </div>
      </div>
    </div>
  );
}

