import React, { useState } from 'react';

interface Content {
  id: string;
  type: 'image' | 'vide' | 'text' | 'html';
  title: string;
  content: string;
  duration: number;
  interactive?: boolean;
  cta?: {
    text: string;
    action: string;
  };
}

const Index = () => {
  const [cureentView, setCurrentView] = useState<'dashboard' | 'display' | 'preview'>('dashboard');
  const [isPlaying, setIsPlaying] = useState(false);
  const [content, setContent] = useState<Content[]>([
     {
      id: '1',
      type: 'text',
      title: 'Bem-vindos ao Futuro',
      content: 'Sistema de Digital Signage com interações touch screen e conteúdo dinâmico',
      duration: 6000,
      interactive: true,
      cta: {
        text: 'Saiba Mais',
        action: '/info'
      }
    },
    {
      id: '2',
      type: 'image',
      title: 'Tecnologia Avançada',
      content: signageBg1,
      duration: 8000,
      interactive: true,
      cta: {
        text: 'Explore',
        action: '/explore'
      }
    }
  ]);

  const handleContentUpdate = (newContent: Content[]) => {
    setContent(newContent);
  };

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  }

  const handlePreview = () => {
    setCurrentView('preview');
  }

  if (currentView === 'display') {
    return (
      <div className="relative">
        <SignageDisplay
          content={content}
          autoPlay={isPlaying}
          showControls={true}
        />
        <Button
          onClick={() => setCurrentView('dashboard')}
        >
          <Settings/>
          Dashboard
        </Button>
      </div>
    );
  }

  if (currentView === 'preview') {

  }

  return (
    <div className="">
      <div className="">
        <div className="">

          <div className="">
            <div className="">
              <h1 className="">Digital Signage</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
