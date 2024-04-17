!function () {
  this.main = function () {
    makeHTTPRequest('assets/aita_reader_bookmarklet_0.1.js', function(event) {
      processRequest('#aita_reader_bookmarklet', event)
    });
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
  }

  main();

}();