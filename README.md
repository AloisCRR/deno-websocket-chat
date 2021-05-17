# Basic WebSockets chat using Deno

I developed this project to enter the world of Deno, the new JavaScript runtime environment that will co-exist with Node, it has some serious benefits, such as TypeScript as first class citizen and promises as well.

## Run Locally

Clone the project

1. Install:

   - [Deno](https://deno.land/)

1. Clone the project:

   ```bash
   git clone https://github.com/AloisCRR/deno-websocket-chat.git
   ```

1. Go to the project directory:

   ```bash
   cd deno-websocket-chat
   ```

1. Start the server:

   ```bash
   deno run --allow-net ./src/server.js
   ```

   Open `public > index.html` in your browser, type your username and select a chat group.

## Screenshots

![App Screenshot](https://i.imgur.com/8U9ZAaw.png)
![App Screenshot](https://i.imgur.com/4r6XivU.png)

## Tech Stack

| Name                                                                       | Description                                                            |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [Deno](https://deno.land/)                                                 | New JavaScript and TypeScript runtime that will co-exist with Node.js. |
| [Bootstrap 4](https://getbootstrap.com/)                                   | CSS framework                                                          |
| [WebSockets](https://developer.mozilla.org/es/docs/Web/API/WebSockets_API) | Real-time communication protocol                                       |

## Roadmap

- [x] Chat functionality
- [ ] TypeScript
- [ ] Testing
- [ ] Hosting, domain, etc.
- [ ] CI/CD
