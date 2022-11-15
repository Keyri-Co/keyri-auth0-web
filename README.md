# Keyri Auth0 QR Login Demonstration Web App

This sample demonstrates the integration of [Keyri QR Login](https://docs.keyri.com/) with an Auth0 authentication system into a Next.js application created using [create-next-app](https://nextjs.org/docs/api-reference/create-next-app).

This sample demonstrates how Keyri QR login may be used in an application spanning a web and mobile component that utilizes Auth0 for authentication and user management.

## Caveats

- Certain functionality in this demo web application, namely the exchange of a refresh token for an access token and id token, are best executed server-side.
- Authentication in this example is not persisted - if the user refreshes the page, they will be logged out. Persistence was not the goal of this application, but rather to demonstrate the integration of Keyri QR Login with Auth0. Persistence can be easily achieved in a manner of your choosing; this application illustrates how id tokens and access tokens can land in your web app, and you can decide how to persist them.

## Project setup

Use `npm` to install the project dependencies:

```bash
npm install
```

## Run the sample

### Compile and hot-reload for development

This compiles and serves the Next.js app and starts the API server on port 3000.

```bash
npm run dev
```

## Create a Free Keyri Account

1. Go to the [Keyri dashboard](https://app.keyri.com) and click **Sign Up**.
2. Go through the email verification flow to finish creating your account.

## License

This project is licensed under the MIT license. See the [LICENSE](./LICENSE) file for more info.
