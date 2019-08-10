# react-blog
Open source blog built with:
- **React** for creating a SPA
- **Redux** for global state
- **Express** for making back-end development easier
- **bcryptjs** for hashing passwords
- **JWT** for token creation and authentication
- **node-postgres** for connecting to the database (PostgreSQL)
- **SASS** for better css organization and readability

## Screenshot
![home-page](/screenshots/home-page.png)
![new-entry](/screenshots/new-entry.png)
![sign-in](/screenshots/sign-in.png)
![sign-up](/screenshots/sign-up.png)

## How to install

Step 1: installing dependencies
```bash
git clone https://github.com/alochaus/react-blog.git
cd react-blog/

#install server dependencies
npm i

#install client dependencies
cd client/
npm i

cd ..

#if you want to run ONLY the server
npm run server

#if you want to run ONLY the client
npm run client

#if you want to run BOTH
npm run dev
```

Step 2: creating tables in database
```
CREATE TABLE entries(
    header char(50) NOT NULL,
    subheader char(300) NOT NULL,
    cateogry char(100) NOT NULL,
    content text NOT NULL,
    author char(50) NOT NULL,
    date char(20) NOT NULL
);
CREATE TABLE users(
    email char(100) NOT NULL,
    username char(20) NOT NULL,
    hash text NOT NULL
);
```

Step 3: setting environment variables  
Fill the dotenv_example with database information, create a jwtsecretkey and then save the file as ".env".

Example:
```
PGUSER=Josh
PGPASSWORD=mysupersecretpassword
PGDATABASE=blog
PGPORT=5432
PGHOST=myhostname
JWTSECRETKEY=as8dhj0a98sfh
```

