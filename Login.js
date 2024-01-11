function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const xhttp = new XMLHttpRequest();
  xhttp.open('POST', 'http://192.168.157.123:3000/customers/login');
  xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

  xhttp.send(JSON.stringify({
    email: email,
    password: password
  }));

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const response = JSON.parse(this.responseText);
      console.log(response);

      if (response.status === 'ok') {
        Swal.fire({
          text: response.message,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = './index.html';
          }
        });
      } else {
        Swal.fire({
          text: response.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };
  return false;
}
