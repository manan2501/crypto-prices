# Crypto Prices
![image of project structure](https://i.ibb.co/hHZBNf6/image.png)

React router was used to create to routes:
1. /
2. /:coinName

"/" route would render CoinList and "/:coinName" will render CoinDetail.

CoinList will make an get request to get the coin data.
Response will include info like id, name, fullName, price, priceChange, tags, etc.
We then extract all the unique tags from the response and show them at top using `tagCard`.
We have used pagination with 10 coins on each page.
This coins can be filtered using the `tagCards` available on the top.

Upon clicking `coinCard`, user will be redirected to "/:coinName" where coinName is the name of coin which user clicked.

`CoinDetail` will extract the `coinName` from params and show it in the LineChart with the help of `react-chartjs-2` which is developed upon `chart.js`.
LineChart is ploted based on the response recived from the get request.
We will send same get to same api every 60 seconds by using `setInterval` and update our data accordingly.

### References
Pagination: https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
Chart: https://react-chartjs-2.js.org/
