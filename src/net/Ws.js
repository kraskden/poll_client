import { Client } from '@stomp/stompjs/esm6';
import SockJS from 'sockjs-client'


const WS_PATH = "http://localhost:4000/ws"

let Ws = {}

Ws.getClient = () => {
    return new Client({
        webSocketFactory: () =>  new SockJS(WS_PATH),
        connectHeaders: {
          "Authorization": "Bearer:eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrcmFza2Rlbi5uZXRAeWEucnUiLCJpYXQiOjE1OTI1Mjg4MjB9.BrhLP43nbNlKhPza_NqeMPm-Uczq5Bl6NfIwnChGBm4"
        },
        debug: function (e) {
          console.log(e)
        }
    })
}



export default Ws;