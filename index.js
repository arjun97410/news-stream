// News API Key (Replace with your own API key from NewsAPI.org)
const API_KEY = "fbcc7ff8f07a4d89b4775589f980059d";

// Elements
const newsAccordian = document.getElementById("newsAccordian");
const newsSourceDropdown = document.getElementById("newsSource");
const getNewsBtn = document.getElementById("getNewsBtn");
const searchText = document.getElementById("searchText");
const searchBtn = document.getElementById("searchbtn");

// Function to Fetch News from API
function getdata(source = "the-washington-post") {
    let url = `https://newsapi.org/v2/top-headlines?sources=${source}&pageSize=50&apiKey=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let articles = data.articles;
            let html = "";

            articles.forEach((element, index) => {
                let news = `
                <div class="searchAccordian accordion-item">
                    <h2 class="accordion-header" id="heading${index}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                            <span><strong>News ${index + 1}: &nbsp;</strong> ${element.title}</span>
                        </button>
                    </h2>
                    <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#newsAccordian">
                        <div class="accordion-body">
                            <p>${element.content || "No content available."} 
                                <a href="${element.url}" target="_blank"> Read more...</a>
                            </p>
                        </div>
                    </div>
                </div>`;
                html += news;
            });

            newsAccordian.innerHTML = html;
        })
        .catch(error => {
            console.error("Error fetching news:", error);
            newsAccordian.innerHTML = `<h5 class="text-danger">Failed to fetch news. Please try again later.</h5>`;
        });
}

// Function to Filter News
function searchNewsUpdate() {
    let searchValue = searchText.value.toLowerCase();
    let articles = document.getElementsByClassName("searchAccordian");

    Array.from(articles).forEach(element => {
        let newsTitle = element.getElementsByTagName("span")[0].innerText.toLowerCase();
        let newsDescription = element.getElementsByTagName("p")[0].innerText.toLowerCase();

        if (newsTitle.includes(searchValue) || newsDescription.includes(searchValue)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
}

// Event Listener for "Get News" Button
getNewsBtn.addEventListener("click", () => {
    const selectedSource = newsSourceDropdown.value;
    getdata(selectedSource);
});

// Event Listener for Search
searchBtn.addEventListener("click", searchNewsUpdate);
searchText.addEventListener("input", searchNewsUpdate);

// Load Default News on Page Load
getdata();