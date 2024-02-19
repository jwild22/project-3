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

document.addEventListener('DOMContentLoaded', () => {
  const postID = document.URL.split('=')[1];
  const nytimesAPI = `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=_id%3A"${postID}"&api-key=Z4Zobg9LyecRqacQYsjnjmFb52iTaMUk`;
  const articles = document.getElementById('article');
  const spinner = `<div class="spinner-border mt-5" id="spinner"></div>`;

  const article = `
  <div class="d-flex justify-content-between my-5">
    <div></div>
  </div>
`;

  fetch(nytimesAPI)
    .then((result) => {
      articles.innerHTML += spinner;
      return result.json();
    })
    .then((result) => {
      const spinnerId = document.getElementById('spinner');
      spinnerId.remove();
      result = result.response.docs['0'];
      console.log(result.multimedia);
      let publishedDate = new Date(result.pub_date);
      let month = months[publishedDate.getMonth()];
      let day = publishedDate.getDay();
      let newArticle = article.replace(
        `<div></div>`,
        `<div class="" id="${result.uri}">
          <a href="./index.html"><img id="arrow" src="./assets/left.png" alt="arrow" /></a>
          <p id="author">${result.byline.original} <span id="in">in</span> ${result.section_name} <span id="in">&#183; ${month} ${day}</span></p>
          <a class="title">${result.headline.main}</a>
          <p id="summary">${result.lead_paragraph}</p>
          <img id="img_big" src="http://static01.nyt.com/${result.multimedia[11].url}" alt="picture" />
         </div>
        `
      );
      articles.innerHTML += newArticle;
    });
});
