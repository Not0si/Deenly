import React, { Component, ErrorInfo, ReactNode } from "react"
import { Button, Text, View } from "react-native"

interface FallbackProps {
  error: Error | null
  resetError: () => void
}

interface ErrorBoundaryProps {
  children: ReactNode
  FallbackComponent?: React.ComponentType<FallbackProps>
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

const DefaultFallback: React.FC<FallbackProps> = ({ error, resetError }) => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
    }}
  >
    <Text>Something went wrong.</Text>

    {error?.message && (
      <Text style={{ marginVertical: 8 }}>{error.message}</Text>
    )}

    <Button title='Try Again' onPress={resetError} />
  </View>
)

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo)
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
    })
  }

  render() {
    const { children, FallbackComponent = DefaultFallback } = this.props

    if (this.state.hasError) {
      return (
        <FallbackComponent
          error={this.state.error}
          resetError={this.resetError}
        />
      )
    }

    return children
  }
}

interface WithErrorBoundaryOptions {
  FallbackComponent?: React.ComponentType<FallbackProps>
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithErrorBoundaryOptions = {}
): React.FC<P> {
  const { FallbackComponent = DefaultFallback, onError } = options

  const ComponentWithErrorBoundary: React.FC<P> = (props) => (
    <ErrorBoundary FallbackComponent={FallbackComponent} onError={onError}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  )

  ComponentWithErrorBoundary.displayName = `withErrorBoundary(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`

  return ComponentWithErrorBoundary
}
