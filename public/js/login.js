window.onload = () => {
    let usernameHolder = document.getElementById("username");
    let passwordHolder = document.getElementById("password");
    let loginButton = document.getElementById("login");
    let registerButton = document.getElementById("register");
    let checker = document.getElementById("checker");
    loginButton.onclick = async () => {
        let username = usernameHolder.value;
        let password = passwordHolder.value;
        let checked = checker.checked;
        try {
            let result = await axios.post('/login', {
                username,
                password,
                checked
            });
            if (result.data.isValid) {
                alert('登录成功');
                sessionStorage.setItem('currentUsername',username);
                location.href = './index.html';
            } else {
                alert('错误提示：' + result.data.message);
            }
        } catch (err) {
            console.log(err);
            alert('错误提示：发起http请求出错');
        }
    };

    registerButton.onclick = async () => {
        let username = usernameHolder.value;
        let password = passwordHolder.value;
        try {
            let result = await axios.post('/register', {
                username,
                password
            });
            if (result.data.isValid) {
                alert('注册成功');
            } else {
                alert('错误提示：' + result.data.message);
            }
        } catch (err) {
            console.log(err);
            alert('错误提示：发起http请求出错');
        }
    };
};