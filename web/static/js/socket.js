// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "web/static/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/my_app/endpoint.ex":
import {Socket} from "phoenix"

let socket = new Socket("/socket", {params: {token: window.userToken}})

// When you connect, you'll often need to authenticate the client.
// For example, imagine you have an authentication plug, `MyAuth`,
// which authenticates the session and assigns a `:current_user`.
// If the current user exists you can assign the user's token in
// the connection for use in the layout.
//
// In your "web/router.ex":
//
//     pipeline :browser do
//       ...
//       plug MyAuth
//       plug :put_user_token
//     end
//
//     defp put_user_token(conn, _) do
//       if current_user = conn.assigns[:current_user] do
//         token = Phoenix.Token.sign(conn, "user socket", current_user.id)
//         assign(conn, :user_token, token)
//       else
//         conn
//       end
//     end
//
// Now you need to pass this token to JavaScript. You can do so
// inside a script tag in "web/templates/layout/app.html.eex":
//
//     <script>window.userToken = "<%= assigns[:user_token] %>";</script>
//
// You will need to verify the user token in the "connect/2" function
// in "web/channels/user_socket.ex":
//
//     def connect(%{"token" => token}, socket) do
//       # max_age: 1209600 is equivalent to two weeks in seconds
//       case Phoenix.Token.verify(socket, "user socket", token, max_age: 1209600) do
//         {:ok, user_id} ->
//           {:ok, assign(socket, :user, user_id)}
//         {:error, reason} ->
//           :error
//       end
//     end
//
// Finally, pass the token on connect as below. Or remove it
// from connect if you don't care about authentication.

socket.connect()

// Now that you are connected, you can join channels with a topic:
let channel = socket.channel("room:main", {})
channel.join()
  .receive("ok", resp => { 
    console.log("Joined successfully", resp) 
    onChannelJoin()
  })
  .receive("error", resp => { console.log("Unable to join", resp) })

channel.on("connect", payload => {
  //console.log(payload.params)
  if (payload.params.uuid === localStorage.getItem('uuid')) {
    console.log(payload)
    getGeolocation()
  }
  addChatMessage(payload.params.uuid, 'Connected')  
})
channel.on("location", payload => {
    console.log('on location')
    console.log(payload)
    addChatMessage(payload.params.uuid, 'Got location', payload.params.location)  
})

function onChannelJoin() {
  const cachedUuid = localStorage.getItem('uuid')
  let uuid = guid()
  if (cachedUuid) uuid = cachedUuid
  localStorage.setItem('uuid', uuid)
  channel.push("connect", {uuid: uuid})
}

function getGeolocation() {
  console.log('getGeolocation')
  if (navigator.geolocation) {
    console.log('getGeolocation 1')
    //console.log($('#connect').length)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('successGeolocation 2')
        let coords = [position.coords.latitude, position.coords.longitude]
        channel.push("location", {location: coords})
      },
      () => {
        console.log('errGeolocation')
      },
      {timeout:5000}
    )
  }
}

function addChatMessage(name, message, location) {
  const chatBody = document.getElementById("chat-body")

  var msgContainer = document.createElement("div")
  msgContainer.classList.add("msg-container")

  var msgHeader = document.createElement("div")
  msgHeader.classList.add("msg-header")
  if (typeof location !== 'undefined') {
    msgHeader.innerHTML=name + " <span>" + location + "</span>"
  } else {
    msgHeader.textContent=name
  }
  msgContainer.appendChild(msgHeader) 

  var msgText = document.createElement("div")
  msgText.classList.add("msg-text")
  msgText.textContent=message
  msgContainer.appendChild(msgText) 

  chatBody.appendChild(msgContainer) 
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
//https://stackoverflow.com/questions/19511597/how-to-get-address-location-from-latitude-and-longitude-in-google-map
//https://stackoverflow.com/questions/37120226/how-can-i-reply-directly-to-a-users-message-using-phoenix-channels
export default socket
