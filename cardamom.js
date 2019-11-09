// * Test-bed separate bot using the same command files

// * Imports
const commando = require("discord.js-commando");
const path = require("path");
const config = require(path.join(__dirname, "cardamomConfig.json"))
const { RichEmbed } = require("discord.js");

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

// * Starboard Message Handling
client.on("messageReactionAdd", (message, emoji, user) => {
    if (emoji.name !== "⭐") return;
    if (message.author == user) return;

    const starboard = client.getChannel(message.channel.id).guild.channels.find(c => c.name.toLowerCase() === 'starboard'); // Starboard channel

    if (!starboard) return;

    const fetch = await starboard.fetchMessages({ limit: 100 });
    const stars = fetch.find(m => m.embeds[0].footer.text.startsWith("⭐") && m.embeds[0].footer.text.endsWith(message.id));

    if (stars) { // Uses information from previous starboard element
        const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text); // RegEx to find amount of stars
        const foundStar = stars.embeds[0];
        const image = message.attachments.size > 0 ? await this.extension(reaction, message.attachments.array()[0].url) : "";
        const embed = new RichEmbed()
            .setColor(foundStar.color)
            .setDescription(foundStar.description)
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setFooter(`⭐ ${parseInt(star[1])+1} | ${message.id}`)
            .setImage(image);
        const starMsg = await starboards.fetchMessage(stars.id);
        await starMsg.edit({ embed });
    }
    else { // Functions with new starboard element
        const image = message.attachments.size > 0 ? await this.extension(reaction, message.attachments.array()[0].url) : "";
        if (image === "" && message.cleanContent.length < 1) return; // Handles empty message starring
        const embed = new RichEmbed()
            .setColor(message.guild.member(args.user).displayHexColor)
            .setDescription(message.cleanContent)
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp(new Date())
            .setFooter(`⭐ 1 | ${message.id}`)
            .setImage(image);
        
        await starboard.send({ embed });

        // TODO: Fix this.extension functionality
    }
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
        ["management", "Server management commands"],
        ["music", "Music-related commands"],
        ["owner", "Owner-only commands"]
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, "commands"));

// * Magic!
client.login(config.token);