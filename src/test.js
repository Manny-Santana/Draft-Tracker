// @ts-nocheck
const endpoint = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=Micro&apikey=JPOQL6NWBOFGUGHF`;

$(() => {
  $.ajax({ url: endpoint }).done(data => {
    for (let i = 0; i < data.bestMatches.length; i++) {
      console.log(data.bestMatches[i]);
    }
  });
});
