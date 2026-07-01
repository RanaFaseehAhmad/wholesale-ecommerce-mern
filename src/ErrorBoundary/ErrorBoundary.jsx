import React, { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error: error }
    }
    componentDidCatch(error, errorInfo) {
        console.log("Error:", error);
        console.log("Error Info:", errorInfo);
    }


    render() {
        if (this.state.hasError) {

            return (
                this.props.fallback || <h2>Something Went Wrong</h2>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary