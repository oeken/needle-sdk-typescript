# Needle SDK TypeScript

This library provides tools for developing integrations for Needle. For example integrations, see the [Needle Integrations](https://github.com/oeken/needle-integrations) repository.

If you want to develop a data connector for Needle, this is the right place to start.

## Getting Started

Needle integrations are implemented as standalone fullstack web applications. In order to ease the development process, we provide a library that contains shared components and utilities such as authentication, database access, and more.

Install the library using your preferred package manager:

```bash
npm install needle-sdk
```

```bash
bun i needle-sdk
```

```bash
yarn add needle-sdk
```

```bash
pnpm add needle-sdk
```

You must use `needle-sdk` as a run time dependency in your project and use the provided functionality on your backend code. See some of the most frequently used utilities below.

| Function              | Description                                                                   |
| --------------------- | ----------------------------------------------------------------------------- |
| `validateSession`     | Validate a session token. You can read the token value from the cookies.      |
| `createConnector`     | Create a new connector. Talks with Needle API to register a new connector.    |
| `getConnector`        | Get a connector by ID. Retrieve connector details from Needle API.            |
| `listConnector`       | List all connectors.                                                          |
| `deleteConnector`     | Delete a connector.                                                           |
| `publishConnectorRun` | Publish a connector run. Inform Needle about the results of the connector run |

Note that every function requires user authentication. Session token represents a user authentication and you can read the token value from the cookies.

For example usage, see connector implementations in the [Needle Integrations](https://github.com/oeken/needle-integrations) repository.

## Requirements

This library requires a `needle.config.js` file to be present in the root of your project. This file contains your integration's configuration. See an example below:

```js
export default {
  appId: "MyAppId",
  appName: "My App Name",
  appSlug: "my-app",
  connectorType: "ext_my_app",
  connectorLogo: "https://needle-ai.com/images/needle-logo.png",
};
```

You must also make an environment variable `NEEDLE_APP_SECRET` available in your project. This value allows secure communication between your integration and Needle. Keep this value secret at all times. In case it is compromised, you can revoke it and generate a new one.

For getting started with the configuration file, contact us at [support@needle-ai.com](mailto:support@needle-ai.com) to get your app ID and secret. If you wish you can also contact us in our [Discord server](https://discord.gg/XSHaP5pPHT).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
