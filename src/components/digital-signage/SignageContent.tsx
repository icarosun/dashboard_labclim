import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';
import { SignageContent as SignageContentType } from './types';

interface SignageContentProps {
  content: SignageContentType;
}

export function SignageContent({ content }: SignageContentProps) {
  const [currencyData, setCurrencyData] = useState<any>(null);

  // Fetch currency data when current content is currency type
  useEffect(() => {
    if (content?.type === 'currency') {
      fetch('https://brasilapi.com.br/api/cambio/v1/cotacao/USD/2025-07-12')
        .then(response => response.json())
        .then(data => setCurrencyData(data))
        .catch(error => console.error('Erro ao buscar cotação:', error));
    }
  }, [content]);

  if (!content) return null;

  switch (content.type) {
    case 'image':
      return (
        <div 
          className="relative w-full h-full bg-cover bg-center bg-no-repeat animate-slide-up"
          style={{ backgroundImage: `url(${content.content})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      );

    case 'text':
      return (
        <div className="flex items-center justify-center h-full p-12 text-center animate-slide-up">
          <div className="space-y-8">
            <h2 className="text-6xl md:text-8xl font-bold gradient-text leading-tight">
              {content.title}
            </h2>
            <p className="text-2xl md:text-4xl text-muted-foreground max-w-4xl">
              {content.content}
            </p>
          </div>
        </div>
      );

    case 'html':
      return (
        <div 
          className="w-full h-full p-8 animate-slide-up"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
      );

    case 'currency':
      return (
        <div className="flex items-center justify-center h-full p-12 text-center animate-slide-up">
          <div className="space-y-12">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <DollarSign className="w-16 h-16 text-green-400" />
              <TrendingUp className="w-12 h-12 text-blue-400" />
            </div>
            
            <h2 className="text-6xl md:text-8xl font-bold gradient-text leading-tight">
              Cotação USD/BRL
            </h2>
            
            {currencyData ? (
              <div className="space-y-6">
                <div className="text-8xl md:text-9xl font-bold text-green-400">
                  R$ {parseFloat(currencyData.bid).toFixed(4)}
                </div>
                <div className="text-2xl md:text-3xl text-muted-foreground">
                  Variação: {currencyData.varBid > 0 ? '+' : ''}{currencyData.varBid}%
                </div>
                <div className="text-lg text-muted-foreground">
                  Última atualização: {new Date(currencyData.timestamp * 1000).toLocaleString('pt-BR')}
                </div>
              </div>
            ) : (
              <div className="text-4xl text-muted-foreground animate-pulse">
                Carregando cotação...
              </div>
            )}
          </div>
        </div>
      );

    default:
      return null;
  }
}
