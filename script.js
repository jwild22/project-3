const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const nytimesAPI =
  'https://api.nytimes.com/svc/mostpopular/v2/emailed/30.json?api-key=Z4Zobg9LyecRqacQYsjnjmFb52iTaMUk';

const article = `
  <div class="d-flex justify-content-between my-5">
    <div></div>
  </div>
`;

const articles = document.getElementById('article');
const spinner = `<div class="spinner-border mt-5" id="spinner"></div>`;

function loadArticles() {
  fetch(nytimesAPI)
    .then((results) => {
      articles.innerHTML += spinner;
      return results.json();
    })
    .then((result) => {
      const spinnerId = document.getElementById('spinner');
      spinnerId.remove();
      result.results.forEach((item) => {
        // console.log(item);
        let publishedDate = new Date(item.published_date);
        let month = months[publishedDate.getMonth()];
        let day = publishedDate.getDay();
        let newArticle = article.replace(
          `<div></div>`,
          `<div class="col-8" id="${item.uri}">
            <p id="author">${item.byline} <span id="in">in</span> ${item.section} <span id="in">&#183; ${month} ${day}</span></p>
            <a class="title">${item.title}</a>
            <p id="summary">${item.abstract}</p>
           </div>
          <img src="${item.media[0]['media-metadata'][2].url}" alt="picture" />
          `
        );
        articles.innerHTML += newArticle;
      });
    });
}

loadArticles();

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const buttons = Array.from(document.getElementsByClassName('title'));
    buttons.forEach((button) => {
      if (button) {
        button.addEventListener('click', () => {
          window.location.href = `index2.html?post=${button.parentNode.id}`;
        });
      } else {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('post');
        if (postId) {
          console.log('Post ID:', postId);
        }
      }
    });
  }, 800);
});
