const { PHASE_DEVELOPMENT_SERVER, PHASE_EXPORT, PHASE_PRODUCTION_BUILD, PHASE_PRODUCTION_SERVER } = require('next/constants')

module.exports = (phase) => {

    if (phase === PHASE_PRODUCTION_SERVER || phase === PHASE_PRODUCTION_BUILD) {
        return {
            env: {
                SERVER_URL: process.env.SERVER_URL,
        PEER_SERVER_PORT: process.env.PEER_SERVER_URL_PORT,
                PEER_SERVER_URL: process.env.PEER_SERVER_URL,
            }
        }
    }

    return {
        env: {
            SERVER_URL: "https://localhost:5000",
            PEER_SERVER_PORT: "5001",
            PEER_SERVER_URL: "localhost",
        }
    }
}

