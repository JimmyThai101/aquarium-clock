"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { clearClockStorage } from "@/lib/storage";

type Props = { children: ReactNode };
type State = { hasError: boolean };

/**
 * If a preference or overlay leaves the clock blank, offer a one-click reset.
 */
export class ClockErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Aquarium clock crashed", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="clock-error">
          <p>The clock hit a snag.</p>
          <button
            type="button"
            className="clock-btn"
            onClick={() => {
              clearClockStorage();
              window.location.reload();
            }}
          >
            Reset clock
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
