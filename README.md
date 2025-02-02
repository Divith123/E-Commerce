<h2>Instruction</h2>
<ol>
  <li><p>To run the app you first need to download and install Node.js and npm on your computer. Here is a link to tutorial that explains how to install them: <a href="https://www.youtube.com/watch?v=4FAtFwKVhn0" target="_blank">https://www.youtube.com/watch?v=4FAtFwKVhn0</a>. Also here is the link where you can download them: <a href="https://nodejs.org/en" target="_blank">https://nodejs.org/en</a></p></li>
  <li><p>When you install Node.js and npm on your computer you need to download and install MySQL on your computer. Here is another link to the tutorial which explains how you can download and install MySQL on your computer: <a target="_blank" href="https://www.youtube.com/watch?v=BxdSUGBs0gM&t=212s">https://www.youtube.com/watch?v=BxdSUGBs0gM&t=212s</a>. Here is a link where you can download MySQL: <a href="https://dev.mysql.com/downloads/installer/" target="_blank">https://dev.mysql.com/downloads/installer/</a></p></li>
  <li><p>This step is optional, but highly recommended if you don't have a database management app. Because HeidiSQL is beginner-friendly and very easy to use than other database management options. Here is a link to the tutorial which explains how to download and install HeidiSQL: <a href="https://www.youtube.com/watch?v=oJ24MyLeiPs" target="_blank">https://www.youtube.com/watch?v=oJ24MyLeiPs</a> and here is a link where you can download it: <a href="https://www.heidisql.com" target="_blank">https://www.heidisql.com</a></p></li>
  <li><p>When you install all the programs you need on your computer you need to download the project. When you download the project, you need to extract it.</p></li>
  <li><p>After you extract the project you need to open the project folder in your code editor and in the root create a file with the name .env.</p></li>
  <li><p>You need to put the following code in the .env file and instead of username and password put your MySQL username and password:</p></li>
</ol>

```
DATABASE_URL="mysql://username:password@localhost:3306/singitronic_nextjs"
NEXTAUTH_SECRET=12D16C923BA17672F89B18C1DB22A
NEXTAUTH_URL=http://localhost:3000
```

<p>7. After you do it, you need to create another .env file in the server folder and put the same DATABASE_URL you used in the previous .env file:</p>

```
DATABASE_URL="mysql://username:password@localhost:3306/singitronic_nextjs"
```

<p>8. Now you need to open your terminal of choice in the root folder of the project and write:</p>


```
npm install
```

<p>9. Now you need to navigate with the terminal in the server folder and install everything:</p>

```
cd server
npm install
```

<p>10. You will need to run the Prisma migration now. Make sure you are in the server folder and write:</p>

```
npx prisma migrate dev
```

<p>11. Next is to insert demo data. To do it you need to go to the server/utills folder and call insertDemoData.js:</p>

```
cd utills
node insertDemoData.js
```

<p>12. Now you can go back to the server folder and run the backend:</p>

```
cd ..
node app.js
```

<p>13. While your backend is running you need to open another terminal(don't stop the backend). In the second terminal, you need to make sure you are in your root project folder and write the following:</p>

```
npm run dev
```

<p>14. Open <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> and see it live!</p>


<h2>Project screenshots</h2>

<h3>Home page</h3>

![singitronic home page](https://github.com/Kuzma02/Electronics-eCommerce-Shop-With-Admin-Dashboard-NextJS-NodeJS/assets/138793624/a48c092d-1f19-4bae-a480-0b5862630e1c)

<h3>Shop page</h3>

![singitronic shop page](https://github.com/Kuzma02/Electronics-eCommerce-Shop-With-Admin-Dashboard-NextJS-NodeJS/assets/138793624/1133effb-0511-40c6-aee5-119404c5af34)

<h3>Single product page</h3>

![singitronic single product page](https://github.com/Kuzma02/Electronics-eCommerce-Shop-With-Admin-Dashboard-NextJS-NodeJS/assets/138793624/443ea3e2-4d32-4d15-aa3b-436cbae0eade)

<h3>Register page</h3>

![singitronic register page](https://github.com/Kuzma02/Electronics-eCommerce-Shop-With-Admin-Dashboard-NextJS-NodeJS/assets/138793624/0052cc90-d61a-4a8c-b8d8-02cee1b45d13)

<h3>Login page</h3>

![singitronic logic page](https://github.com/Kuzma02/Electronics-eCommerce-Shop-With-Admin-Dashboard-NextJS-NodeJS/assets/138793624/7a377bb3-330f-43a4-860f-400bf7aa0f97)

<h3>Search page</h3>

![singitronic search page](https://github.com/Kuzma02/Electronics-eCommerce-Shop-With-Admin-Dashboard-NextJS-NodeJS/assets/138793624/384c7f55-16ee-4966-b612-a34f5506af51)

<h3>Wishlist page</h3>

![singitronic wishlist page](https://github.com/Kuzma02/Electronics-eCommerce-Shop-With-Admin-Dashboard-NextJS-NodeJS/assets/138793624/a20568d6-12fb-42e6-a5ef-583f6e79229a)

<h3>Cart page</h3>

![singitronic cart page](https://github.com/Kuzma02/Electronics-eCommerce-Shop-With-Admin-Dashboard-NextJS-NodeJS/assets/138793624/b9d326be-342c-4f6a-af64-34794f6c39eb)

<h3>Checkout page</h3>

![singitronic checkout page](https://github.com/Kuzma02/Electronics-eCommerce-Shop-With-Admin-Dashboard-NextJS-NodeJS/assets/138793624/a458d931-9df2-4e3d-bf3f-702c1a3ba9e9)

<h3>Admin dashboard - All orders page</h3>

![singitronic admin orders page](https://github.com/Kuzma02/Electronics-eCommerce-Shop-With-Admin-Dashboard-NextJS-NodeJS/assets/138793624/498b07f4-422c-46c5-b2e4-ed2a93306b7a)

<h3>Admin dashboard - All products page</h3>

![singitronic admin products page](https://github.com/Kuzma02/Electronics-eCommerce-Shop-With-Admin-Dashboard-NextJS-NodeJS/assets/138793624/e26822ab-6c7e-4474-9161-288a5bb3476f)

<h3>Admin dashboard - All categories page<h3>

![singitronic admin categories page](https://github.com/Kuzma02/Electronics-eCommerce-Shop-With-Admin-Dashboard-NextJS-NodeJS/assets/138793624/9e4a54d7-5bbb-4f1b-bdab-43c1079510e1)

<h3>Admin dashboard - All users page</h3>

![singitronic admin users page](https://github.com/Kuzma02/Electronics-eCommerce-Shop-With-Admin-Dashboard-NextJS-NodeJS/assets/138793624/e14e8f2c-4377-42fd-b89b-d4868cc11b11)
