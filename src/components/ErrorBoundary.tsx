import React, { Component, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-[60vh] flex items-center justify-center bg-dark-black text-white">
          <div className="text-center max-w-md px-4">
            <h2 className="text-3xl font-bold font-poppins mb-4">
              Oups, quelque chose s'est mal passé
            </h2>
            <p className="text-gray-400 mb-8">
              Une erreur inattendue est survenue. Veuillez réessayer ou revenir à l'accueil.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={this.handleReset}
                className="bg-lime-accent text-dark-black hover:bg-lime-accent/90 rounded-full px-6"
              >
                Réessayer
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full px-6 border-gray-600 text-white hover:bg-dark-gray"
              >
                <a href="/">Accueil</a>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
