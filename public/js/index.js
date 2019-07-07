export let indexFunction = () => {
    let logoutBtn = document.getElementById("logout");
    let userInfo = document.getElementById("userInfo");
    let currentUsername = sessionStorage.getItem('currentUsername');

    if (currentUsername) {
        userInfo.innerHTML = '欢迎回来：' + currentUsername;
    }

    logoutBtn.onclick = async () => {
        try {
            await axios.post('/logout');
            alert('登出成功');
            sessionStorage.removeItem('currentUsername');
            location.href = './login.html';
        } catch (err) {
            alert('错误提示：发起http请求出错');
        }
    }
};