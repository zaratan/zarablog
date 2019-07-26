import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';

class MainErrorCatcher extends Component {
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
    if (Sentry !== undefined) {
      Sentry.configureScope(scope => {
        Object.keys(info).forEach(key => {
          scope.setExtra(key, info[key]);
        });
      });
      Sentry.captureException(error);
    } else {
      console.log({ message: 'Something went wrong :(', error, info });
    }
  }

  render() {
    const { hasError } = this.state;
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;
    if (hasError) {
      return (
        <div style={{ margin: 'auto' }}>
          <p>Quelque chose est brisé, j'ai bien été notifié de l'erreur :(</p>
          <p>
            Vous pouvez me contacter via{' '}
            <a href="mailto:denis.pasin@gmail.com">denis.pasin@gmail.com</a>
          </p>
        </div>
      );
    }
    return children;
  }
}

export default MainErrorCatcher;
