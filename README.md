This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Installation with NPM

First, install the dependencies with npm.

```bash
npm install
```

Next, run the server.

```
npm run dev
# or
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Set the Count Down Timer

To change the count down timer, modify `midnight.current` in `app/page.tsx`.

```JavaScript
midnight.current.setHours(23, 59, 59, 0) //< Default midnight.
midnight.current.setHours(20, 0, 0, 0) //< Count down to 8:00 p.m.
```
