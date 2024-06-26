!function () {
  this.main = function () {
    const that = this;
    makeHTTPRequest('assets/aita_reader_bookmarklet_0.1.js', function(event) {
      processRequest('#aita_reader_bookmarklet', event)
    });
    window.onload = function() {
      that.setupCopyButton();
    }
  }

  this.makeHTTPRequest = function (url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
    xhr.onreadystatechange = callback;
  }

  this.processRequest = function (domId, event) {
    xhr = event.target;

    if (xhr.readyState === 4 && xhr.status === 200) {
      let responseBody = xhr.responseText;
      checkResponse(domId, responseBody)
    }
    return false;
  }

  this.checkResponse = function(domId, response) {
    document.querySelector(domId).href=response;
    document.querySelector('#js-textarea').textContent = response;
  }

  this.setupCopyButton = function() {

    // Select the textarea and the button
    const textarea = document.getElementById('js-textarea');
    const copyButton = document.getElementById('copy-button');

    const that = this;
    // Add a click event listener to the textarea to select its content
    textarea.addEventListener('click', function() {
      textarea.select(textarea.value);
      that.copy();
    });

    // Add a click event listener to the button to copy the textarea content
    copyButton.addEventListener('click', function() {
      textarea.select();
      that.copy(textarea.value);
    });
  }

  this.copy = function(value) {
    document.execCommand('copy');
    navigator.clipboard.writeText(value).then(function() {
      console.log('Copying to clipboard was successful!');
    }, function(err) {
      console.error('Could not copy text: ', err);
    });
  }


  main();

}();