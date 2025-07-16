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
  const [currentView, setCurrentView] = useState<'dashboard' | 'display' | 'preview'>('dashboard');
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
      content: "https://imgs.search.brave.com/_6izdbSVpHbwqbawMBquENAqLf6WtvwCZmTG8AhitpY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/ZnJvbnQuZnJlZXBp/ay5jb20vaG9tZS9h/bm9uLXJ2bXAvY3Jl/YXRpdmUtc3VpdGUv/cGhvdG9ncmFwaHkv/Y2hhbmdlLWxvY2F0/aW9uLndlYnA",
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
              <div className="">
                <button onClick={() => setCurrentView("display")}>
                  Teste
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
