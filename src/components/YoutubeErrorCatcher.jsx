import React, { Component } from 'react';

export class YoutubeErrorCatcher extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    if (window.Sentry !== undefined) {
      window.Sentry.configureScope(scope => {
        Object.keys(info).forEach(key => {
          scope.setExtra(key, info[key]);
        });
      });
      window.Sentry.captureException(error);
    } else {
      console.log({ message: "Video can't load :(", error, info });
    }
  }

  render() {
    const { hasError } = this.state;
    // eslint-disable-next-line react/prop-types
    const { children, videoId } = this.props;
    if (hasError) {
      return (
        <div style={{ margin: 'auto' }}>
          <p>La vidéo ne peut pas se charger :(</p>
          <p>
            Vous pouvez regarder la vidéo directement sur Youtube{' '}
            <a href={`https://www.youtube.com/watch?v=${videoId}`}>
              https://www.youtube.com/watch?v={videoId}
            </a>
          </p>
        </div>
      );
    }
    return children;
  }
}

export default YoutubeErrorCatcher;
