import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="h-full flex flex-col items-center justify-center p-10 bg-slate-900 text-white text-center">
          <AlertTriangle className="w-16 h-16 text-rose-500 mb-6" />
          <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Kritik Sistem Hatası</h2>
          <p className="text-slate-400 text-sm max-w-md mb-8">
            Bileşen yüklenirken beklenmedik bir hata oluştu. Neural bağlantı kesilmiş olabilir.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="flex items-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-[10px] font-black uppercase transition-all"
          >
            <RefreshCcw className="w-4 h-4" /> Yeniden Dene
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
