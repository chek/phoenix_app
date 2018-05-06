# PhoenixApp

## Connect to ChatApp (https://github.com/chek/chat)

Phoenix app and Chat app directories must be in same directory, so it will be connected automatically.

## Start Phoenix app

To start your Phoenix app:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `npm install`
  * Start Phoenix endpoint with `mix phoenix.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

On start browser will ask to allow location information, please click allow.
Anyway sometimes some browsers have some problem to provide this info.
In this case your user will appear in chat without location.

You can open this url in different browsers so the app will see it as different users,
so you can chat with your self.



Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
