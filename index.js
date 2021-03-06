// * Imports
require("dotenv").config();
const commando = require("discord.js-commando");
const path = require("path");

// * Client Initialization
const client = new commando.Client({
    owner: process.env.OWNER,
    commandPrefix: process.env.PREFIX,
    nonCommandEditable: true,
});

// * Core Event Handling
client.on("ready", () => {
    // Startup
    console.log(`Arugula is online on ${client.guilds.size} guilds.`);
    // TODO: Create some discord built-in indicator for bot availability
    client.user.setActivity("the plants grow | aru!", {
        type: "WATCHING",
    });
});
client.on("message", () => {
    // TODO: Add in more message handling
});

// * Guild Events
client.on("guildCreate", (guild) => {
    // Joined Guild
    console.log(`Arugula has joined ${guild.name}. ID: ${guild.id}`);
});
client.on("guildDelete", (guild) => {
    // Left Guild
    console.log(`Arugula has left ${guild.name}. ID: ${guild.id}`);
});

// * Error Handling
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));

// * Command Registry
client.registry
    .registerDefaultTypes()
    .registerGroups([
        ["basic", "Basic commands"],
        ["management", "Server management commands"],
        ["owner", "Owner-only commands"],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, "commands"));

// * Magic!
client.login();
