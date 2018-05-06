defmodule PhoenixApp.RoomChannel do
    use Phoenix.Channel
  
    def join("room:main", _message, socket) do
      {:ok, socket}
    end
    def join("room:" <> _private_room_id, _params, _socket) do
      {:error, %{reason: "unauthorized"}}
    end

    def handle_in("connect", %{"uuid" => uuid}, socket) do
        socket = assign(socket, :uuid, uuid)
        Chat.Registry.create(Chat.Registry, uuid)
        params = %{uuid: uuid}
        broadcast! socket, "connect", %{params: params}
        {:noreply, socket}
    end    

    def handle_in("message", %{"message" => message}, socket) do
        {:ok, user} = Chat.Registry.lookup(Chat.Registry, socket.assigns.uuid)
        location = Chat.User.get(user, "location")        
        params = %{uuid: socket.assigns.uuid, location: location, message: message}
        broadcast! socket, "message", %{params: params}
        {:noreply, socket}
    end    

    def handle_in("location", %{"location" => location}, socket) do
        {:ok, user} = Chat.Registry.lookup(Chat.Registry, socket.assigns.uuid)
        Chat.User.put(user, "location", location)
        params = %{uuid: socket.assigns.uuid, location: location}
        broadcast! socket, "location", %{params: params}
        {:noreply, socket}
    end    
end