const discord = require("discord.js")

module.exports.run = async (client, message, arguments) => {

    message.delete();

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(message.author + " Deze commando kun jij helaas niet gebruiken!")

    var role1 = message.guild.roles.cache.find(r => r.id === "717630438729973771");

    var role2 = message.guild.roles.cache.find(r => r.id === "718074192997646367");

    var role3 = message.guild.roles.cache.find(r => r.id === "718074786663628840");

    var role4 = message.guild.roles.cache.find(r => r.id === "718081666421096479");

    var role5 = message.guild.roles.cache.find(r => r.id === "718074522267549738");









    





    var aankondiging = arguments.join(" ")

    var aankondigingEmbed = new discord.MessageEmbed()
        .setTitle("Aankondiging")
        .setColor("#86ceb1")
        .setDescription('Nieuwe aankoniging!')
        .addField(`De aankondiging:`, aankondiging)
        .addField(`Verstuurd door:`, message.author)
        .setFooter("Robi")




    var aankondigingChannel = message.member.guild.channels.cache.find(channels => channels.name === "aankondigingen❗")

    if (!aankondigingChannel) return message.author.send("Geen kanaal gevonden!")

    aankondigingChannel.send(aankondigingEmbed).then(async msg => {



        var emoji = await promptMessage(msg, message.author, ["✅", "❌"])



    })



    


    //aankondigingChannel.send(`${role1}\n${role2}\n${role3}\n${role4}\n${role5}`)

    





    //</everyone>/@<Nintendo Player 🎮> @<Pc Player 💻> @<Playstation Player🎮> @<Mobile/Tablet Player 📱> @<Xbox Player 🎮>










}
module.exports.help = {
    name: "aankondiging"

}