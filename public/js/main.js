$(document).ready(function(){

    $('#signup-form').on('submit', function(event){
        event.preventDefault()
        var signupInfo = {
            username : $('#signup-form .username').val(),
            password : $('#signup-form .password').val(),
        }
        $.post('/signup', signupInfo, function(data){
            console.log(data)
            window.location.href="/dashboard"
        })
    })

    $('#login-form').on('submit', function(event){
        event.preventDefault()
        var signupInfo = {
            username : $('#login-form .username').val(),
            password : $('#login-form .password').val(),
        }
        $.post('/login', signupInfo, function(data){
            console.log(data)
            window.location.href="/dashboard"
        })
    })

})

let index = {
    template:
    `
    <div class="container">
        <h2>hello world</h2>
    </div>
    `
}

let login = {
    template:
    `
    <div class="container">
        <h1>Sign Up</h1>
        <form id="signup-form">
            <input type="text" class="username" placeholder="username">
            <input type="password" class="password" placeholder="password">
            <input type="submit" value="submit!">
        </form>
        <hr>
        <h1>Log In</h1>
        <form id="login-form">
            <input type="text" class="username" placeholder="username">
            <input type="password" class="password" placeholder="password">
            <input type="submit" value="submit!">
        </form>
    </div>
    `
}

var myRouter = new VueRouter({
    routes: [
        {
            path: '/',
            component: index,
        },
        {
            path: '/login',
            component: login,
        },
    ]
})

var mainVm = new Vue({
    el: '#app',
    router: myRouter,
})
