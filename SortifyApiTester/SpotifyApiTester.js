function createCORSRequest(method, url)
{
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr)
  // Check if the XMLHttpRequest object has a "withCredentials" property.
  {
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    console.log("One");
    xhr.open(method, url, true);

  }
  else if (typeof XDomainRequest != "undefined")
  {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    console.log("Two");
    xhr.open(method, url);

  }
  else
  {

    console.log("Three");
    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}





function GetAuthorizationFromSpotify()
{
  let SpotifyBaseAuthURL = "https://accounts.spotify.com/authorize";
  let Client_id = "ac97261ac3e74255a9f5b928e6456d9d";
  let response_type = "code";
  let redirect_uri = "http://localhost:8080/P2SpotifyApiTester/";
  let url = SpotifyBaseAuthURL+
            "?" + "client_id="+
            Client_id+
            "&"+ "response_type="+
            response_type+
            "&"+"redirect_uri="+
            redirect_uri;
  let request=document.getElementById("AuthRequest");
  request.innerHTML=url;
  let response = document.getElementById("AuthResponse");
  let xhr = createCORSRequest('GET', url); //ready state is 0.
  if(!xhr)
  {
    throw new Error('CORS not supported');
  }
  xhr.onreadystatechange = function()
  {
    if(xhr.readyState === 4 && xhr.status === 200)
    {
      response.innerHTML = xhr.responseURL;
    }
  }
  //xhr.open('GET', url); //ready state is 1.
  xhr.send(); //ready state is 2.
}

window.onload = function()
{
  GetAuthorizationFromSpotify();
  console.log("here");
}
