const redisHandler= require("../models/redisHandler");

module.exports= {
    sendAvgTime10MinToServer: () =>{
        return redisHandler.avgWaitingTime10Min();
    },

    sendAvgTime5MinToServer: () => {
        return redisHandler.avgWaitingTime5Min();
    },

    sendDiconnectionAmountToServer: () =>{
        console.log( " disconnections: " + redisHandler.diconnectionAmount());
        return redisHandler.diconnectionAmount();
    },

    sendEachTopicAmountToServer: () => {
        return redisHandler.topic();
    },
    avgWaitingTime5MinFromMidNight:() => {
        var ret =[[],[]];
        const date = Date.now();
        const dateTimeFormat = new Intl.DateTimeFormat('en', {hour: 'numeric', minute: 'numeric'});
        const [{value: hour}, , {value: minute}] = dateTimeFormat.formatToParts(date);

        for (var i = 0; i <= hour ; i++) {
            for (var j = 0; j <= 60 ; j+=5) {
                if( i == hour && j>minute) break;
                ret[0].push(i+":"+j);
                ret[1].push(redisHandler.avgWaitingTime5Min(i,j));
            }

        }
        // console.log("ret[0]" + ret[0]);
        // console.log("ret[1]" + ret[1]);
        return ret;



    },

}