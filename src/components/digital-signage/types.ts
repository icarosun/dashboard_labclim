export interface SignageContent {
  id: string;
  type: 'image' | 'vídeo' | 'text' | 'html';
  title: string;
  content: string;
  duration: number;
  interactive?: boolean;
  cta?: {
    text: string;
    action: string;
  }
}
export interface SignageDisplayProps {
  content: SignageContent[];
  autoPlay?: boolean;
  showControls?: boolean;
  className?: string;
}
