import React, { Component } from 'react';

export class MainErrorCatcher extends Component {
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
    window.Sentry.configureScope(scope => {
      Object.keys(info).forEach(key => {
        scope.setExtra(key, info[key]);
      });
    });
    window.Sentry.captureException(error);
  }

  render() {
    const { hasError } = this.state;
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;
    if (hasError) {
      return (
        <div>
          Quelque chose est brisé, j'ai bien été notifié de l'erreur :( Vous
          pouvez me contacter via
          <a href="mailto:denis.pasin@gmail.com">denis.pasin@gmail.com</a>
        </div>
      );
    }
    return children;
  }
}

export default MainErrorCatcher;
