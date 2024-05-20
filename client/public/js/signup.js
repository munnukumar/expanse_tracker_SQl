const form = document.querySelector("form");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const signup = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        mobile_No: e.target.mobile_No.value
    }
    axios.post("http://localhost:3000/user/signup", signup)
        .then(result => {
            alert("user signup successfully");
            window.location.href = "login.html"
            // window.location.reload();
        })
        .catch(err => alert(err.response.data.errors[0].message))
})

const login = document.getElementById("login");
login.addEventListener("click", () => {
    window.location.href = "login.html"
})