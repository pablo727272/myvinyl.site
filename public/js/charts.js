// decades price chart

new Chart(document.getElementById("decades-pie-chart"), {
    type: 'pie',
    data: {
      labels: ["1920's", "1930's", "1940's", "1950's", "1960's", "1970's", "1980's", "1990's", "2000's", "2010's"],
      datasets: [{
        label: "Albums by Decade",
        backgroundColor: ["red", "orange","yellow","green","blue","indigo","violet","olive","beige","pink"],
        data: [3,5,2,11,55,45,37,25,10,6]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Albums by Decade'
      }
    }
});

// genres chart

new Chart(document.getElementById("genres-pie-chart"), {
    type: 'pie',
    data: {
      labels: ["Rock", "R&B/Hip-Hop", "Pop", "Country", "Latin", "Folk", "Blues", "Electronic", "Jazz", "World"],
      datasets: [{
        label: "Albums by Genre",
        backgroundColor: ["red", "orange","yellow","green","blue","indigo","violet","olive","beige","pink"],
        data: [55,10,14,20,5,25,15,7,28,10]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Albums by Genre'
      }
    }
});

// lowest price chart

new Chart(document.getElementById("lowest-price-pie-chart"), {
    type: 'pie',
    data: {
      labels: ["$0.00-10.00", "$10.00-20.00", "$20.00-50.00", "$50.00-75.00", "$75.00-100.00", "$100.00-$200.00"],
      datasets: [{
        label: "Albums by Lowest Value Price",
        backgroundColor: ["red", "orange","yellow","green","blue","indigo"],
        data: [84,45,40,7,8,5]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Albums by Lowest Value Price'
      }
    }
});

// purchase price chart

new Chart(document.getElementById("purchase-price-pie-chart"), {
    type: 'pie',
    data: {
      labels: ["$0.00-10.00", "$10.00-20.00", "$20.00-50.00", "$50.00-75.00", "$75.00-100.00", "$100.00-$200.00"],
      datasets: [{
        label: "Albums by Lowest Purchase Price",
        backgroundColor: ["blue","indigo","violet","olive","beige","pink"],
        data: [97,65,20,4,2,1]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Albums by Lowest Purchase Price'
      }
    }
});
