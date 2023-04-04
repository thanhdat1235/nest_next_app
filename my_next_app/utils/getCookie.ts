const getCookie = (name: string) => {
    if (document.cookie && document.cookie !== '') {        
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          const cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          return cookieValue;
        }
      }
    }
  }

  export default getCookie;