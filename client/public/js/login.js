const form = document.querySelector(".form");
const forgetForm = document.querySelector(".forget-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const login = {
        email: e.target.email.value,
        password: e.target.password.value
    }
    axios.post("http://localhost:3000/user/login", login)
        .then(result => {
            console.log("55555", result);
            alert(result.data.message);
            localStorage.setItem("token", result.data.token)
            window.location.href = "expense.html"
        })
        .catch(err => alert(err.response.data.message))
})

forgetForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    axios.post("http://localhost:3000/password/forgotpassword", { email: email })
        .then(result => {
            alert(result.data.message);
            window.location.reload();
        })
        .catch(err => {
            if (err.response.status === 404) {
                alert(err.response.data.error);
            }
            else {
                alert("Something went wrong");
            }
        })
})

const signup = document.getElementById("signup");
signup.addEventListener("click", () => {
    window.location.href = "signup.html"
})