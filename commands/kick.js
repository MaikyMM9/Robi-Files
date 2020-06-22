const discord = require("discord.js");

module.exports.run = async (client, message, arguments) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Deze commando is alleen voor de staff leden!");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Geen permissie!");

    if (!arguments[0]) return message.reply("Er is geen gebruiker genoemd!");

    if (!arguments[1]) return message.reply("Er zijn geen redenen meegegeven!");

    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));

    var reden = arguments.slice(1).join(" ")

    if (!kickUser) return message.reply("De genoemde gebruiker is niet gevonden!")

    var embedPrompt = new discord.MessageEmbed()
        .setTitle("Verificatie (reageer binnen 30 seconden)")
        .setColor("#470191")
        .setDescription(`Wil je ${kickUser} verwijderen uit de server? (let op! deze gebruiker kan weer lid worden met een nieuwe uitnodiging!)`)


    var embed = new discord.MessageEmbed()
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

            kickUser.send(kickUserEmbed);

            kickUser.kick(reden).catch(err => {


                if (err) return message.reply("Er is iets fout gegaan!");

                var kickUserEmbed = new discord.MessageEmbed()
                    .setTitle(`Je bent verwijderd uit de:${message.guild.name} server! `)
                    .addField(`Met de volgende reden ben je verwijderd:`, reden)
                    .addField(`Je kunt eventueel weer deelnemen met de volgende link:`, `https://discord.gg/5m2waGd`)





            });

            message.channel.send(embed)

            var logChannel = message.member.guild.channels.cache.find(channels => channels.name === "staff-logs")
            logChannel.send(embed)

        } else if (emoji === "❌") {
            var logChannel = message.member.guild.channels.cache.find(channels => channels.name === "staff-logs")
            msg.delete();
            message.reply("Geanuleerd!").then(m => m.delete(5000));


            var annuleerEmbed = new discord.MessageEmbed()
                .setTitle("**KICK GEANNULEERD!**")
                .setDescription(`De ban van: ${kickUser} is geannuleerd!`)

            logChannel.send(annuleerEmbed)

        }





    });


}




async function promptMessage(message, author, time, reactions) {

    time *= 1000;

    for (const reaction of reactions) {
        await message.react(reaction);
    }

    var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;
    return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);




}


module.exports.help = {
    name: "kick"

}