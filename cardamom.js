// * Test-bed separate bot using the same command files

// * Imports
const commando = require("discord.js-commando");
const path = require("path");
const config = require(path.join(__dirname, "cardamomConfig.json"))

// * Client Initialization
const client = new commando.Client({
    owner: config.ownerid,
    commandPrefix: config.prefix
});

// * Core Event Handling
client.on("ready", () => { // Startup
    console.log(`Cardamom is online on ${client.guilds.size} guilds.`);
    client.user.setActivity("Arugula | car!", {
        type: "WATCHING"
    });
});
client.on("message", () => {
    // TODO: Add in more message handling
});

// * Guild Events
client.on("guildCreate", guild => { // Joined Guild
    console.log(`Cardamom has joined ${guild.name}. ID: ${guild.id}`);
});
client.on("guildDelete", guild => { // Left Guild
    console.log(`Cardamom has left ${guild.name}. ID: ${guild.id}`);
});

// * Error Handling
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
// ! For use in testing alone
//// client.on("debug", (e) => console.info(e));

// * Command Registry
client.registry
    .registerDefaultTypes()
    .registerGroups([
        ["basic", "Basic commands"],
        ["owner", "Owner-only commands"]
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, "commands")); // Testing without the __dirname call

// * Magic!
client.login(config.token);