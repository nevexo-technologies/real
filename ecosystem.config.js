module.exports = {
  apps: [{
    name: 'formular-estereal',
    script: 'cd apps/formular && yarn run start',
  }, {
    name: "discord-bot",
    script: "yarn run bot:update; node apps/discord/index.js",
    interpeter: "~/.nvm/versions/node/v16.14.2/bin/node"
  }],

};
