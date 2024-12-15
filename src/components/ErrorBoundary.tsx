// src/components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from "react";
import { Alert } from "react-bootstrap";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Alert variant="danger">
          <h3>Bir hata oluştu</h3>
          <p>Lütfen daha sonra tekrar deneyiniz.</p>
        </Alert>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
