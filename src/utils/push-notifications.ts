import { DefaultApi, createConfiguration } from "@onesignal/node-onesignal";

export const configureOSClient = (restApiKey: string) => {
    const tokenProvider = {
        getToken: () => restApiKey,
    };

    const configuration = createConfiguration({
        authMethods: {
            rest_api_key: {
                tokenProvider,
            },
        },
    });

    return new DefaultApi(configuration);
};
