import React, { useState } from 'react';
import { SignageDisplay } from "../components/digital-signage/SignageDisplay.tsx";
import { Button } from "../components/ui/button.tsx";
import { Card, CardContent } from "../components/ui/card.tsx";
import { SignageDashboard } from "../components/digital-signage/SignageDashboard.tsx";
import { Monitor, Settings, Play, Eye } from "lucide-react";

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
          autoPlay={true}
          showControls={false}
        />
        <Button
          onClick={() => setCurrentView('dashboard')}
          className="absolute top-4 left-4 z-50 bg-black/80 backdrop-blur-sm border-white/20 text-white hover:bg-black/90"
        >
          <Settings className="w-4 h-4 mr-2"/>
          Dashboard
        </Button>
      </div>
    );
  }

  if (currentView === 'preview') {
    return (
      <div className="relative">
        <SignageDisplay
          content={content}
          autoPlay={false}
          showControls={true}
        />
        <div className="absolute top-4 left-4 z-50 flex space-x-2">
          <Button
            onClick={() => setCurrentView('dashboard')}
            className="bg-black/80 backdrop-blur-sm border-white/20 text-white hover:bg-black/90"
          >
            <Settings className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <Button
            onClick={() => setCurrentView('display')}
            className="bg-black/80 backdrop-blur-sm border-white/20 text-white hover:bg-black/90"
          >
            <Monitor className="w-4 h-4 mr-2" />
            Modo Display
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-dark">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        
        <div className="relative px-6 py-24 mx-auto max-w-7xl lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight gradient-text sm:text-6xl">
              Digital Signage
            </h1>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button 
                onClick={() => setCurrentView('display')}
                className="bg-gradient-primary interactive-hover text-lg px-8 py-6"
              >
                <Play className="w-5 h-5 mr-2" />
                Iniciar Display
              </Button>
              <Button 
                onClick={() => setCurrentView('preview')}
                variant="outline" 
                className="interactive-hover text-lg px-8 py-6"
              >
                <Eye className="w-5 h-5 mr-2" />
                Preview
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-primary rounded-full opacity-60 animate-float" />
        <div className="absolute top-1/3 right-16 w-16 h-16 bg-gradient-accent rounded-full opacity-40 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-gradient-primary rounded-full opacity-50 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight gradient-text sm:text-4xl">
              Funcionalidades Principais
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tudo que você precisa para criar experiências digitais impactantes
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  icon: Monitor,
                  title: 'Touch Screen Interativo',
                  description: 'Interface responsiva com suporte a gestos touch, navegação intuitiva e feedback visual em tempo real.'
                },
                {
                  icon: Settings,
                  title: 'Gestão de Conteúdo',
                  description: 'Dashboard completo para criar, editar e programar conteúdo com diferentes tipos de mídia.'
                },
                {
                  icon: Play,
                  title: 'Reprodução Automática',
                  description: 'Sistema de playlist com transições suaves, controle de tempo e pausas para interação.'
                }
              ].map((feature) => (
                <Card key={feature.title} className="interactive-hover">
                  <CardContent className="p-8">
                    <dt className="text-base font-semibold leading-7">
                      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-primary">
                        <feature.icon className="h-8 w-8 text-white" aria-hidden="true" />
                      </div>
                      {feature.title}
                    </dt>
                    <dd className="mt-4 text-base leading-7 text-muted-foreground">
                      {feature.description}
                    </dd>
                  </CardContent>
                </Card>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Dashboard Section */}
      <div className="border-t border-border">
        <SignageDashboard
          content={content}
          onContentUpdate={handleContentUpdate}
          onPreview={handlePreview}
          isPlaying={isPlaying}
          onPlayToggle={handlePlayToggle}
        />
      </div>
    </div>
  );
}

export default Index;
