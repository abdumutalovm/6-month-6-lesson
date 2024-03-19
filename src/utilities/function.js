const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function validate(name, age, email, password, nat) {
    if (name.trim().length < 3) {
      alert("Name is empty")
      return false;
    }
    if (email.trim().length < 3) {
      alert("Email is empty")
      return false;
    }
    if (password.trim().length < 3) {
      alert("Password is empty")
      return false;
    }
    if (age <= 0 || age >= 200) {
      alert("Email is empty")
      return false;
    }
    if (!Number(age)) {
      alert("Age is not valid number")
      return false;
    }
    const emailValid = validateEmail(email)
    if (!emailValid) {
      alert("Email is not valid")
      return false;
    }
    if (!nat) {
      alert("Nationlity is empty")
      return false;
    }
    return true;
  }
  function getUsers() {
    let users = []
    if (localStorage.getItem('users')) {
      users = JSON.parse(localStorage.getItem('users'))
    }

    return users;
  }


  export {validate,getUsers};