import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card.tsx';
import { Button } from '../ui/button.tsx';
import { Input } from '../ui/input.tsx';
import { Label } from '../ui/label.tsx';
import { Textarea } from '../ui/textarea.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Plus, 
  Play, 
  Pause, 
  Edit, 
  Trash2, 
  Eye, 
  Monitor, 
  Calendar,
  Image,
  Type,
  Video,
  Code,
  DollarSign
} from 'lucide-react';

import { cn } from '../../lib/utils.ts';

interface Content {
  id: string;
  type: 'image' | 'video' | 'text' | 'html' | 'currency';
  title: string;
  content: string;
  duration: number;
  interactive?: boolean;
  cta?: {
    text: string;
    action: string;
  };
  thumbnail?: string;
}

interface SignageDashboardProps {
  content: Content[];
  onContentUpdate: (content: Content[]) => void;
  onPreview: () => void;
  isPlaying: boolean;
  onPlayToggle: () => void;
}

export function SignageDashboard({ 
  content, 
  onContentUpdate, 
  onPreview, 
  isPlaying, 
  onPlayToggle 
}: SignageDashboardProps) {
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState<Partial<Content>>({
    type: 'text',
    title: '',
    content: '',
    duration: 5000,
    interactive: false
  });

  const handleAddContent = () => {
    if (!newContent.title || !newContent.content) return;

    const content_item: Content = {
      id: Date.now().toString(),
      type: newContent.type as Content['type'],
      title: newContent.title,
      content: newContent.content,
      duration: newContent.duration || 5000,
      interactive: newContent.interactive,
      cta: newContent.cta
    };

    onContentUpdate([...content, content_item]);
    setNewContent({
      type: 'text',
      title: '',
      content: '',
      duration: 5000,
      interactive: false
    });
  };

  const handleEditContent = () => {
    if (!selectedContent) return;

    const updatedContent = content.map(item => 
      item.id === selectedContent.id ? selectedContent : item
    );
    onContentUpdate(updatedContent);
    setIsEditing(false);
    setSelectedContent(null);
  };

  const handleDeleteContent = (id: string) => {
    const filteredContent = content.filter(item => item.id !== id);
    onContentUpdate(filteredContent);
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'text': return <Type className="w-4 h-4" />;
      case 'html': return <Code className="w-4 h-4" />;
      case 'currency': return <DollarSign className="w-4 h-4" />;
      default: return <Type className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Digital Signage</h1>
          <p className="text-muted-foreground">Gerencie seu conteúdo de sinalização digital</p>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            onClick={onPlayToggle}
            className={cn(
              "interactive-hover",
              isPlaying ? "bg-destructive hover:bg-destructive/90" : "bg-gradient-primary"
            )}
          >
            {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isPlaying ? 'Pausar' : 'Reproduzir'}
          </Button>

          <Button 
            onClick={onPreview}
            variant="outline"
            className="interactive-hover"
          >
            <Monitor className="w-4 h-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="schedule">Programação</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Content List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Lista de Conteúdo</h2>
                <Button 
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-accent interactive-hover"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Conteúdo
                </Button>
              </div>

              <div className="space-y-3">
                {content.map((item) => (
                  <Card 
                    key={item.id} 
                    className={cn(
                      "cursor-pointer transition-all duration-300 hover:shadow-glow",
                      selectedContent?.id === item.id && "ring-2 ring-primary"
                    )}
                    onClick={() => setSelectedContent(item)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            {getContentIcon(item.type)}
                          </div>
                          <div>
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {item.type} • {item.duration / 1000}s
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedContent(item);
                              setIsEditing(true);
                            }}
                            className="interactive-hover"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteContent(item.id);
                            }}
                            className="text-destructive hover:text-destructive/90 interactive-hover"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {content.length === 0 && (
                  <Card className="border-dashed">
                    <CardContent className="p-8 text-center">
                      <div className="space-y-4">
                        <div className="p-4 bg-muted/50 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                          <Monitor className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">Nenhum conteúdo</h3>
                          <p className="text-muted-foreground">Comece criando seu primeiro conteúdo</p>
                        </div>
                        <Button 
                          onClick={() => setIsEditing(true)}
                          className="bg-gradient-primary interactive-hover"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Criar Conteúdo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Content Editor */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {isEditing ? (selectedContent ? 'Editar Conteúdo' : 'Novo Conteúdo') : 'Preview'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="type">Tipo</Label>
                        <Select
                          value={selectedContent?.type || newContent.type}
                          onValueChange={(value) => {
                            if (selectedContent) {
                              setSelectedContent({ ...selectedContent, type: value as Content['type'] });
                            } else {
                              setNewContent({ ...newContent, type: value as Content['type'] });
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Texto</SelectItem>
                            <SelectItem value="image">Imagem</SelectItem>
                            <SelectItem value="video">Vídeo</SelectItem>
                            <SelectItem value="html">HTML</SelectItem>
                            <SelectItem value="currency">Cotação</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="title">Título</Label>
                        <Input
                          id="title"
                          value={selectedContent?.title || newContent.title}
                          onChange={(e) => {
                            if (selectedContent) {
                              setSelectedContent({ ...selectedContent, title: e.target.value });
                            } else {
                              setNewContent({ ...newContent, title: e.target.value });
                            }
                          }}
                          placeholder="Digite o título"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="content">Conteúdo</Label>
                        <Textarea
                          id="content"
                          value={selectedContent?.content || newContent.content}
                          onChange={(e) => {
                            if (selectedContent) {
                              setSelectedContent({ ...selectedContent, content: e.target.value });
                            } else {
                              setNewContent({ ...newContent, content: e.target.value });
                            }
                          }}
                          placeholder="Digite o conteúdo"
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="duration">Duração (ms)</Label>
                        <Input
                          id="duration"
                          type="number"
                          value={selectedContent?.duration || newContent.duration}
                          onChange={(e) => {
                            const duration = parseInt(e.target.value);
                            if (selectedContent) {
                              setSelectedContent({ ...selectedContent, duration });
                            } else {
                              setNewContent({ ...newContent, duration });
                            }
                          }}
                          placeholder="5000"
                        />
                      </div>

                      <div className="flex space-x-2 pt-4">
                        <Button
                          onClick={selectedContent ? handleEditContent : handleAddContent}
                          className="flex-1 bg-gradient-primary interactive-hover"
                        >
                          {selectedContent ? 'Salvar' : 'Adicionar'}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsEditing(false);
                            setSelectedContent(null);
                          }}
                          className="interactive-hover"
                        >
                          Cancelar
                        </Button>
                      </div>
                    </>
                  ) : selectedContent ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          {getContentIcon(selectedContent.type)}
                          <span className="font-medium">{selectedContent.title}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {selectedContent.content.substring(0, 100)}
                          {selectedContent.content.length > 100 && '...'}
                        </p>
                      </div>
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="w-full bg-gradient-accent interactive-hover"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      Selecione um conteúdo para visualizar
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Programação de Conteúdo</span>
              </CardTitle>
              <CardDescription>
                Configure quando e como o conteúdo será exibido
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Funcionalidade de programação em desenvolvimento
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Métricas de engajamento e performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Dashboard de analytics em desenvolvimento
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Configurações</CardTitle>
              <CardDescription>
                Configure o comportamento do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Configurações em desenvolvimento
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
