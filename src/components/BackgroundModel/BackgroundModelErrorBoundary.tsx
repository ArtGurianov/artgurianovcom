"use client";

import { Component, ReactNode } from "react";

interface BackgroundModelErrorBoundaryProps {
  children: ReactNode;
}

interface BackgroundModelErrorBoundaryState {
  hasError: boolean;
}

export class BackgroundModelErrorBoundary extends Component<
  BackgroundModelErrorBoundaryProps,
  BackgroundModelErrorBoundaryState
> {
  public state: BackgroundModelErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): BackgroundModelErrorBoundaryState {
    return { hasError: true };
  }

  public render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}
