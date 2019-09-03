import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://c28732301f1645cba3464254f4d52b52@sentry.io/1540943"
  });
}

function logError(error) {
  Sentry.captureException(error);
}

function logMessage(message) {
  Sentry.captureMessage(message);
}

export default {
  init,
  logError,
  logMessage
};
