const discord = require("discord.js")
const botConfig = require("./botconfig.json");

const fs = require("fs");

const client = new discord.Client();
client.commands = new discord.Collection();



fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kan geen jsFiles vinden!");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen`)

        client.commands.set(fileGet.help.name, fileGet);


    })

});




client.login(process.env.token);

client.on("ready", async () => {

    client.user.setActivity('AnimalCrossing: NH', { type: 'PLAYING' })
        .then(presence => console.log(`Activiteit gezet naar: ${presence.activities[0].name}`))
        .catch(console.error);





    console.log(`De bot: ${client.user.username} is online`)

});
client.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type == "dm") return;

    var prefix = botConfig.prefix;

    if (!message.content.startsWith(prefix)) return;

    var messageArray = message.content.split(" ");

    var arguments = messageArray.slice(1);

    var command = messageArray[0];

    var commands = client.commands.get(command.slice(prefix.length));

    if (commands) commands.run(client, message, arguments);









    if (command === `${prefix}kick`) {


        var args = message.content.slice(prefix.length).split(/ + /);

        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Deze commando is alleen voor de staff leden!");

        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Geen permissie!");

        if (!args[1]) return message.reply("Er is geen gebruiker genoemd!");

        if (!args[2]) return message.reply("Er zijn geen redenen meegegeven!");

        var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

        var reden = args.slice(2).join(" ")

        if (!kickUser) return message.reply("De genoemde gebruiker is niet gevonden!")

        var embedPrompt = new discord.MessageEmbed()
            .setTitle("Verificatie (reageer binnen 30 seconden)")
            .setColor("#470191")
            .setDescription(`Wil je ${kickUser} verwijderen uit de server? (let op! deze gebruiker kan weer lid worden met een nieuwe uitnodiging!)`)


        var embed = new discord.MessageEmbed
            .setColor("#470191")
            .setFooter(message.member.displayName)
            .setTimestamp()
            .setDescription(`**Verwijderde gebruiker: ${kickUser} (${kickUser.id})
        Verwijderd door:** ${message.author}
        **Reden: ** ${reden}`);


        message.channel.send(embedPrompt).then(async msg => {

            var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            if (emoji === "✅") {

                msg.delete();

                kickUser.kick(reden).catch(err => {


                    if (err) return message.reply("Er is iets fout gegaan!");
                });

                message.channel.send(embed

                )

            } else if (emoji === "❌") {

                msg.delete();
                message.reply("Geanuleerd!").then(m => m.delete(5000));
            }





        })


    }



});

async function promptMessage(message, author, time, reactions) {

    time *= 1000;

    for (const reaction of reactions) {
        await message.react(reaction);
    }

    var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;
    return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);




}