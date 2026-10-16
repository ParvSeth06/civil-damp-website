import React from 'react'
import { AlertCircle, RotateCcw, Home as HomeIcon } from 'lucide-react'

/**
 * ErrorBoundary component that catches rendering errors in subtrees,
 * displays a plain-language recovery fallback, and preserves navigation.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log error internally for debugging without exposing raw trace to users
    if (typeof console !== 'undefined' && console.error) {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="rounded-3xl p-8 sm:p-12 my-6 text-center"
          style={{
            background: '#FFFFFF',
            border: '1px solid #DDD9CC',
            boxShadow: '0 4px 20px rgba(23, 63, 53, 0.05)',
            maxWidth: 640,
            margin: '2rem auto',
          }}
          role="alert"
          aria-live="assertive"
        >
          <div
            className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: 'rgba(235, 203, 99, 0.2)', color: '#173F35' }}
          >
            <AlertCircle size={28} />
          </div>

          <h2
            className="text-card-title mb-2"
            style={{ color: '#20241F', fontSize: '1.35rem' }}
          >
            {this.props.fallbackTitle || 'This section could not load'}
          </h2>

          <p
            className="text-body mb-6"
            style={{ color: '#5A5F59', maxWidth: '44ch', margin: '0 auto 1.5rem' }}
          >
            {this.props.fallbackMessage ||
              'We encountered an unexpected issue displaying this content. The surrounding navigation and other sections are still working normally.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={this.handleRetry}
              className="btn-primary"
              style={{ fontSize: '0.9375rem', padding: '0.625rem 1.25rem' }}
            >
              <RotateCcw size={16} />
              Try again
            </button>

            {this.props.recoveryAction ? (
              this.props.recoveryAction
            ) : (
              <a
                href={this.props.returnUrl || '/academics'}
                className="btn-secondary"
                style={{ fontSize: '0.9375rem', padding: '0.625rem 1.25rem' }}
              >
                <HomeIcon size={16} />
                {this.props.returnLabel || 'Return to Academics'}
              </a>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
