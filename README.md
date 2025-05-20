# NC Tunes Server

this is what I am.....

## How to get stated.

1. Ensure you you've install all dependencies using:

```sh
npm install
```

2. To work this locally you will need an `nc_tunes` database on your machine. You can set this up using:

```sh
npm run setup-db
```

3. You'll need to credential for the database inside a `.env` file at the root level of this project. The contents should be as follows:

```
PGDATABASE=nc_tunes
```

4. To seed the database run the following command:

```sh
npm run seed
```

To run to the server in development mode run:

```sh
npm run dev
```
