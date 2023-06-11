export type configType = {
    app: { version: string, is_mandatory: boolean, name: string },
    port: number,
    NODE_ENV: string,
    db: { url: string },
    auth: { local: { key: string, reset_key: string } }
}

export const development: configType = {
    app: {
        version: "0.0.0",
        is_mandatory: false,
        name: "Todo simple app",
    },
    port: 3000,
    NODE_ENV: "development",
    db: {
        url: `mongodb+srv://mostafafathy:Password@cluster0.yfirbch.mongodb.net/GptDemo`
        // url: `mongodb://localhost:27017/GptDemo` //local connection
    },
    auth: {
        local: {
            key: "ZAZDp1IxnPigN9gX4VgiuFl5hSlqSpFaa103S4JsWPGhIKzkMh6vmEiDUbolPeEcVYpN0tN1zkdRE2S3GeOd",
            reset_key: "zazDp1IxnPigN9gX4VgiuFl5hSlqSpFaa103S4JsWPGhIKzkMh6vmEiDUbolPeEcVYpN0tN1zkdRE2S3GeOd",
        },
    },

};