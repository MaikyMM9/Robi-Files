const discord = require("discord.js");
const fs = require("fs");
const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"))

module.exports.run = async (client, message, arguments) => {

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Deze commando is alleen voor de staff leden!");

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("Geen permissie!");

    if (!arguments[0]) return message.reply("Er is geen gebruiker genoemd!");

    if (!arguments[1]) return message.reply("Er zijn geen redenen meegegeven!");

    var warnUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));

    var reden = arguments.slice(1).join(" ");

    if (!warnUser) return message.reply("De genoemde gebruiker is niet gevonden!")

    if (warnUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Deze gebruiker kan geen waarschuwingen krijgen!")

    if (warns[warnUser.id]) {
        warns[warnUser.id] = {
            warns: 0

        };
        warns[warnUser.id].warns++;

        fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
            if (err) console.log(err)

        });

        var embed = new discord.MessageEmbed()
            .setColor("#470191")
            .setFooter(message.member.displayName)
            .setTimestamp()
            .setDescription(`**Waargeschuwde gebruiker: ${warnUser} (${warnUser.id})
    Waarschuwing door:** ${message.author}
    **Reden: ** ${reden}`)
            .addField("Aantal warns", warns[warnUser.id].warns);

        var logChannel = message.member.guild.channels.cache.find(channels => channels.name === "staff-logs")
        logChannel.send(embed)

        if (warns[warnUser.id].warns == 2) {

            var kijkuitEmbed = new discord.MessageEmbed()
                .setColor("#470191")
                .setDescription("Waarschuwing!")
                .addField("Pas op", "Je zit op 2 warns! Bij de 3e word je verbannen!")

            message.channel.send(kijkuitEmbed);


        }
        if (warns[warnUser.id].warns == 3) {

            var kijkuitEmbed = new discord.MessageEmbed()
                .setColor("#470191")
                .setDescription("Waarschuwing!")
                .addField("Pas op", "Je zit op 2 warns! Bij de 3e word je verbannen!")

            message.channel.send(kijkuitEmbed);


        }else if (warns[warnUser.id].warns == 3) {
message.guild.member(warnUser).ban(reden)
message.channel.send(`${kickUser} is verbannen omdat hij of zij 3 warns had`)



        }







    }









}

module.exports.help = {
    name: "warn"

}