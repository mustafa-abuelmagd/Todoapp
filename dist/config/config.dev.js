"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.development = void 0;
exports.development = {
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
