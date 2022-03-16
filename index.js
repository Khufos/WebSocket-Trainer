// npm i ws ;
// npm i readline-sync 

const readlineSync = require('readline-sync');
const Symbol = readlineSync.question('qual o par de moedas que deseja monitorar?:')
const WebSocket = require('ws');
const ws = new WebSocket("wss://stream.binance.com:9443/ws/bookTicker");


ws.onopen = () =>{
    ws.send(JSON.stringify({
        "method":"SUBSCRIBE",
        "params":[
            `${Symbol}@bookTicker`,
        ],
        "id":1,
    }))
}

ws.onmessage = function(evt) {

    process.stdout.write('\033c'); 
    const obj = JSON.parse(evt.data);
    console.log(`Symbol:${obj.s}`)
    console.log(`Best ask:${obj.a}`)
    console.log(`Best ask:${obj.b}`)
};
ws.onerror = function(evt) {
    console.error('an error occurred', evt.data);
};