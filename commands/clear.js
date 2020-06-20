const discord = require("discord.js");

module.exports.run = async(client, message, arguments) =>{

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Je hebt geen toesteming");

    if (!arguments[0]) return message.reply("Geef aantal op");

    if(arguments[0] >= 1000) message.channel.send("Je kan niet meer dan 999 berichten verwijderen :( !");

    if(Number.isInteger(parseInt(args[0]))){
        
        var amount = parseInt(args[0]) + 1;
        

        message.channel.bulkDelete(amount).then(() => {

if(args[0] == 0){
    message.reply (`Leuk geprobeerd!`).then(msg => msg.delete(5000));
} else if (args[0]== 1){
    message.reply (`Er is ${args[0]} bericht succesvol verwijderd.`).then(msg => msg.delete(5000));
}
    else {
        message.reply (`Er zijn ${args[0]} berichten succesvol verwijderd.`).then(msg => msg.delete(5000));


    }

        });

    } else {
        return message.reply("Geef een getal op!");
    }
}

module.exports.help = {
    name: "clear"

}