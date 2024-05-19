const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const login = {
        email: e.target.email.value,
        password: e.target.password.value
    }
    axios.post("http://localhost:3000/user/login", login)
        .then(result => {
            alert(result.data.message);
            window.location.href = "expense.html"
        })
        .catch(err => alert(err.response.data.message))
})

const signup = document.getElementById("signup");
signup.addEventListener("click", () => {
    window.location.href = "signup.html"
})