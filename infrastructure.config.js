module.exports = {
    apps: [{
        name: "forms",
        script: "npm start"
    },
    {
        name: "discord-bot",
        script: "npm run update-bot; npm run bot",
        interpeter: "~/.nvm/versions/node/v16.14.2/bin/node"
    }]
}