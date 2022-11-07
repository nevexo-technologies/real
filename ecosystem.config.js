module.exports = {
  apps: [{
    name: 'formular',
    script: 'cd apps/formular && yarn run start',
  }, {
    name: "discord",
    script: "yarn run bot:update; cd apps/discord && yarn run start",
    interpeter: "~/.nvm/versions/node/v16.14.2/bin/node"
  }],

};
