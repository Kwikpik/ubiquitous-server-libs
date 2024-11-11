import { DefaultApi, type TokenProvider, createConfiguration } from "@onesignal/node-onesignal";

export const configureOSClient = (userAuthKey: string, restApiKey: string) => {
  const authKeyTokenProvider: TokenProvider = {
    getToken: () => userAuthKey,
  };

  const restApiTokenProvider: TokenProvider = {
    getToken: () => restApiKey,
  };

  const configuration = createConfiguration({
    authMethods: {
      user_auth_key: {
        tokenProvider: authKeyTokenProvider,
      },
      rest_api_key: {
        tokenProvider: restApiTokenProvider,
      },
    },
  });

  return new DefaultApi(configuration);
};
