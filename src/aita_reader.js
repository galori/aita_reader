q = function(selector){ return document.querySelectorAll(selector) }
qq = function(selector){ return document.querySelector(selector) }

function getCommentText(comment) {
  let top_comment = comment.querySelector('div.usertext-body')?.textContent;
  let response = comment.querySelector('div.child div.usertext-body')?.textContent;
  return {comment: top_comment, response: response}
}

function getPageContent() {
  title = qq('p.title a.title').textContent;
  author = qq('div#siteTable a.author').textContent;
  upvotes = qq('div#siteTable div.unvoted div.unvoted').textContent;
  text = qq('div#siteTable div.usertext-body').textContent;
  comment_count = qq('div#siteTable a.comments').textContent.match(/\d+/)[0];

  topLevelComments = q('div.commentarea div.nestedlisting>div.comment');
  top3comments = Array.from(topLevelComments).slice(0, 10).map(comment => getCommentText(comment));

  return {title: title, author: author, upvotes: upvotes, text: text, comment_count: comment_count, top3comments: top3comments}
}

function writePageContent(content) {
  html = template(content);
  document.open();
  document.write(html);
  document.close();
}

function template(content) {
  return `
  <html>
  <body>
    <div> 
      <button id="startSpeech">START 🔈</button>
      <button id="stopSpeech">STOP 🔇</button>
      <button id="pauseSpeech">PAUSE ⏸️</button>
      <button id="resumeSpeech">RESUME 🔈️</button>
    </div>
    <div id="content">
      <h1>${content.title}</h1>
      <h2>by ${content.author}</h2>
      <h3>${content.upvotes} upvotes</h3>
      <p>${content.text}</p>
      <h3>${content.comment_count} comments</h3>
      <ul>
        ${content.top3comments.map(comment =>
    comment.response !== undefined ?
      `
           <li>
            <p><b>top comment:</b> ${comment.comment}</p>
            <p><b>response:</b> ${comment.response}</p>
           </li>
          ` :
      `
           <li>
            <p><b>top comment:</b> ${comment.comment}</p>
           </li>
          `
  ).join('')}
      </ul>
    </div>
  </body>
  </html>`
}

function speakPageContent() {
  pageContent = document.querySelector('#content').textContent;
  utterance = new SpeechSynthesisUtterance(pageContent);
  window.speechSynthesis.speak(utterance);
}

function bindButtons() {
  document.getElementById('startSpeech').addEventListener('click', speakPageContent);
  document.getElementById('stopSpeech').addEventListener('click', function() {
    window.speechSynthesis.cancel();
  });
  document.getElementById('pauseSpeech').addEventListener('click', function() {
    window.speechSynthesis.pause();
  });
  document.getElementById('resumeSpeech').addEventListener('click', function() {
    window.speechSynthesis.resume();
  });
}

function main() {
  writePageContent(getPageContent());
  bindButtons();
  speakPageContent();
}

main();