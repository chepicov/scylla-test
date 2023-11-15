# How to run

## Backend

```bash
$ cd api
$ npm install
$ npm run start:dev
```

## Frontend

```bash
$ cd client
$ npm install
$ npm start
```

# Process of development

## Preparations
First of all we need to determine the structure of services.
According to the task description we use Google API.
To reduce number of requests to external API it’s better to save results to our own database, but it seems to be an overwin for now.

So let's start from simple proxy API between client and Google API without using DB.
We'll use Nest.js as it's currently one of the best Node.js frameworks which has clear rules of creating basic REST API.

For the frontend part we will use React + MUI to save time on creating basic components.
As we don't have complicated interactions between the app components, let's build React application using React Context.
Typescript is a must have technology nowadays because it improves app reliability. So we'll use CRA Typescript template.

## Configurations
Now we configured both basic React and Nest applications, installed basic packages, configured linter and prettier.
So we are ready to implement endpoints and React components.

## Basic implementation
Now we added an UI skeleton for a book list and added an endpoint to fetch books from Google API.
Let's work on UI beautifying and creating forms to interact with quantity number.

## Cart implementation
I tried to implement cart using field array from React Hook Form and spent an hour to make it work within provided requirements. But then I realized that it's not neccessary here. I can just create one form per cart item and it would be fine. So I rewrited my solution and it works well.
Now we need to work with ISBN and bonus tasks.

## Finish
We added requests to get Open Library revision numbers, added a filter, cart persistance and a simple unit test. 