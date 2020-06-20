const discord = require("discord.js")

module.exports.run = async (client, message, arguments) => {

    message.delete();


    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(message.author + " Deze commando kun jij helaas niet gebruiken!")

    

    

    var aankondiging = arguments.join(" ")

    var aankondigingEmbed = new discord.MessageEmbed()
        .setTitle("Aankondiging")
        .setColor("#86ceb1")
        .setDescription('Nieuwe aankoniging!')
        .addField(`De aankondiging:`, aankondiging)
        .setFooter("Robi")




        var aankondigingChannel = message.member.guild.channels.cache.find(channels => channels.name === "aankondigingen❗")

        if(!aankondigingChannel) return message.author.send("Geen kanaal gevonden!")

    aankondigingChannel.send(aankondigingEmbed)
    aankondigingChannel.send("@<everyone>") 

    

    //</everyone>/@<Nintendo Player 🎮> @<Pc Player 💻> @<Playstation Player🎮> @<Mobile/Tablet Player 📱> @<Xbox Player 🎮>
    









}
module.exports.help = {
    name: "aankondiging"

}