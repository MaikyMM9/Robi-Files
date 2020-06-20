const discord = require("discord.js");

module.exports.run = async (client, message, arguments) => {





    var icon = message.guild.iconURL;

    var serverEmbed = new discord.MessageEmbed()
        .setTitle("Robi commands")
        .setDescription("Hier kun je alle commando's zien! Van de Robi-BOT")
        .setColor("#59167f")
        .addField("r!server-info", "Hiermee krijg je informatie over de server.")
        .addField("r!bot-info", "Hiermee krijg je informatie over CamielOpYT-BOT.")
        .addField("**Staff commands**", "Hier onder vind je de commands voor staff-leden.")
        .addField("r!dm <gebruiker> <bericht>", "Hiermee stuur je via de bot een privé bericht naar de getagde gebruiker")
        .addField("r!say <bericht>", "Hiermee kun jij de bot iets laten zeggen.")
        .addField("r!bericht <bericht>" , "Hiermee Hiermee kun jij de bot iets laten zeggen, maar dan in een embed!")
        .addField("r!clear <hoeveelheid>"  , "Hiermee verwijder je het aantal bericht wat je hebt opgegeven!")
        .addField("**Exclusieve Beheerder/Owner commands**", "Hier onder vind je de commands voor de Beheerder/owner.")
        .addField("r!aankondiging <bericht>"  , "Hiermee krijgt de hele server een melding over een mededeling/aankondiging!")
        .addField("**Exclusieve Pass-Leden commands**", "Hier onder vind je de commands voor de Pass-Leden.")
        .addField("r!hallo", "De bot zegt hallo terug op jou bericht!")
        .addField("r!ping" , "Laat jouw ping zien!")
        .addField("Er komen meer commands binnenkort", "Ideën? meld ze dan bij de Beheerder")
        .setFooter("Robi")
        
       

    message.channel.send(message.author +  ` Alle commands kan je vinden in je DM.`);
    
    
    return message.author.send(serverEmbed);

    
}



module.exports.help = {
    name: "help"
}