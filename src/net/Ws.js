import { Client } from '@stomp/stompjs/esm6';
import SockJS from 'sockjs-client'


const WS_PATH = "http://localhost:4000/ws"

let Ws = {}

Ws.getClient = () => {
    return new Client({
        webSocketFactory: () =>  new SockJS(WS_PATH),
        connectHeaders: {
          "Authorization": `Bearer:${localStorage.getItem("QUEST_JWT")}`
        },
        debug: function (e) {
          console.log(e)
        }
    })
}



export default Ws;