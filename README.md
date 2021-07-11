# What's this about

This is exploration project that tries using Next.js (TypeScript), Prisma (sqlite) and NextAuth (credentials).

You can load all "buddies" and search them. You can sing in as some buddy (passwords are not hashed in DB) and set a star for your favorite buddies. That is all for now.

There are no tests at the moment.

## How to run

```
npm install
npm run dev
```

## How to browse database

```
npx prisma studio
```

## How to seed database with new data

Database should be seeded but if you want to remove data and let it seeded again

```
npx prisma db seed --preview-feature
```
