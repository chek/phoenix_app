defmodule PhoenixApp.PageController do
  use PhoenixApp.Web, :controller

  def index(conn, _params) do
    #Chat.Registry.create(Chat.Registry, "user_id")
    #{:ok, user} = Chat.Registry.lookup(Chat.Registry, "user_id")
    #Chat.User.put(user, "id", 1)
    #IO.puts Chat.User.get(user, "id")
    render conn, "index.html"
  end
end
