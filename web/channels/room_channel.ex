defmodule PhoenixApp.RoomChannel do
    use Phoenix.Channel
  
    def join("room:main", _message, socket) do
      {:ok, socket}
    end
    def join("room:" <> _private_room_id, _params, _socket) do
      {:error, %{reason: "unauthorized"}}
    end

    def handle_in("location", %{"body" => body}, socket) do
        IO.puts 'handle_in'
        IO.puts body
        broadcast! socket, "location", %{body: body}
        {:noreply, socket}
    end    
end