document.addEventListener("DOMContentLoaded", function () {
  const shortenButton = document.getElementById("shorten-button");
  const copyButton = document.getElementById("copy-button");
  const urlInput = document.getElementById("url-input");
  const shortenedLinkElement = document.getElementById("shortened-link");

  shortenButton.addEventListener("click", shortenUrl);

  function shortenUrl() {
    const originalUrl = urlInput.value;

    // Replace with your is.gd API endpoint
    const apiUrl = "https://is.gd/create.php";

    const params = {
      format: "json",
      url: originalUrl,
    };

    const queryString = Object.keys(params)
      .map((key) => key + "=" + encodeURIComponent(params[key]))
      .join("&");

    const requestUrl = apiUrl + "?" + queryString;

    fetch(requestUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.shorturl) {
          const linkElement = document.createElement("a");
          linkElement.href = data.shorturl;
          linkElement.textContent = data.shorturl;
          shortenedLinkElement.innerHTML = "Shortened URL: ";
          shortenedLinkElement.appendChild(linkElement);
          copyButton.style.display = "inline"; // Show the copy button
        } else if (data.errormessage) {
          alert("Error: " + data.errormessage);
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }

  copyButton.addEventListener("click", copyToClipboard);

  function copyToClipboard() {
    const linkElement = shortenedLinkElement.querySelector("a");
    const tempInput = document.createElement("input");
    tempInput.value = linkElement.href;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
    copyButton.disabled = true;

    // Set a timeout to change the button text back to "Copy" after 5 seconds
    setTimeout(() => {
      copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
      copyButton.disabled = false;
    }, 1000);
  }
});
