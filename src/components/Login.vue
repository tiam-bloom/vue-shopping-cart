<template>
    <div class="body-class">
        <div class="container">
            <!-- Sign Up -->
            <div class="container__form container--signup">
                <form action="#" class="form" @submit="register">
                    <h2 class="form__title">注册</h2>

                    <input v-model="registerForm.username" type="text" placeholder="账号" class="input"
                        pattern="[a-zA-Z][a-zA-Z0-9_]{4,15}" oninvalid="setCustomValidity('请输入以字母开头, 由字母数字下划线组成的4-15位账号!')"
                        oninput="setCustomValidity('')" required />

                    <input v-model="registerForm.email" type="email" placeholder="邮箱" class="input"
                        oninvalid="setCustomValidity('请输入正确的邮箱格式!')" oninput="setCustomValidity('')" required />
                    <input v-model="registerForm.password" type="password" placeholder="密码" class="input"
                        pattern="[a-zA-Z0-9_]{5,17}" oninvalid="setCustomValidity('请输入由数字、字母、下划线组成的5-17位密码!')"
                        oninput="setCustomValidity('')" required />

                    <button class="btn" >注册</button>
                </form>
            </div>

            <!-- Sign In -->
            <div class="container__form container--signin">
                <form action="#" class="form" @submit="login">
                    <h2 class="form__title">登录</h2>

                    <input v-model="loginForm.username" type="text" placeholder="账号" class="input" required />
                    <input v-model="loginForm.password" type="password" placeholder="密码" class="input" required />

                    <a href="#" class="link">忘记密码?</a>
                    <button class="btn" >登录</button>
                </form>
            </div>

            <!-- Overlay -->
            <div class="container__overlay">
                <div class="overlay">
                    <div class="overlay__panel overlay--left">
                        <button class="btn" id="signIn" @click="backLogin">登录</button>
                    </div>
                    <div class="overlay__panel overlay--right">
                        <button class="btn" id="signUp" @click="backRegister">注册</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script >
export default {
    name: 'Login',
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            },
            registerForm: {
                username: '',
                email: '',
                password: ''
            },
        }
    },
    methods: {
        backLogin() {
            const container = document.querySelector(".container");
            container.classList.remove("right-panel-active");
        },
        backRegister() {
            const container = document.querySelector(".container");
            container.classList.add("right-panel-active");
        },
        register() {
            // 使用优先级 const > let > var
            const { username } = this.registerForm;
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find(user => user.username === username);
            if (user) {
                this.$message.warning("账号已注册！请换一个试试");
                return;
            }
            users.push(this.registerForm);
            localStorage.setItem("users", JSON.stringify(users));

            // 通过html的required属性, 校验是否为空
            this.$message.success("注册成功!请登录");

            // 调整到登录页面
            const container = document.querySelector(".container");
            container.classList.remove("right-panel-active");
        },
        login() {
            const { username, password } = this.loginForm;
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find(user => user.username === username);
            if (!user) {
                this.$message.warning("账号不存在, 请先注册");
                return;
            }
            if (user.password !== password) {
                this.$message.warning("密码错误");
                return;
            }
            // 保存登录状态
            sessionStorage.setItem("token", user.username);

            this.$message.success("登录成功");
            // 路由跳转
            this.$router.push("/products");
        }
    },

}
</script>

<style scoped>
.body-class {
    align-items: center;
    /* background-color: var(--white); */
    /*  background: url("https://res.cloudinary.com/dbhnlktrv/image/upload/v1599997626/background_oeuhe7.jpg");*/
    /* background: url("imgs/bj01.png"); */
    /* 决定背景图像的位置是在视口内固定，或者随着包含它的区块滚动。 */
    /* https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-attachment */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: grid;
    height: calc(100vh - 100px);
    place-items: center;
}




.form__title {
    font-weight: 300;
    margin: 0;
    margin-bottom: 1.25rem;
}

.link {
    color: var(--gray);
    font-size: 0.9rem;
    margin: 1.5rem 0;
    text-decoration: none;
}

.container {
    background-color: var(--white);
    border-radius: var(--button-radius);
    box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
        0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
    height: var(--max-height);
    max-width: var(--max-width);
    overflow: hidden;
    position: relative;
    width: 100%;
}

.container__form {
    height: 100%;
    position: absolute;
    top: 0;
    transition: all 0.6s ease-in-out;
}

.container--signin {
    left: 0;
    width: 50%;
    z-index: 2;
}

.container.right-panel-active .container--signin {
    transform: translateX(100%);
}

.container--signup {
    left: 0;
    opacity: 0;
    width: 50%;
    z-index: 1;
}

.container.right-panel-active .container--signup {
    animation: show 0.6s;
    opacity: 1;
    transform: translateX(100%);
    z-index: 5;
}

.container__overlay {
    height: 100%;
    left: 50%;
    overflow: hidden;
    position: absolute;
    top: 0;
    transition: transform 0.6s ease-in-out;
    width: 50%;
    z-index: 100;
}

.container.right-panel-active .container__overlay {
    transform: translateX(-100%);
}

.overlay {
    background-color: var(--lightblue);
    /* background: url("https://res.cloudinary.com/dbhnlktrv/image/upload/v1599997626/background_oeuhe7.jpg"); */
    /* background-image: url(imgs/a0.png); */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    left: -100%;
    position: relative;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    width: 200%;
}



.container.right-panel-active .overlay {
    transform: translateX(50%);
}

.overlay__panel {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    position: absolute;
    text-align: center;
    top: 0;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    width: 50%;
}

.overlay--left {
    transform: translateX(-20%);
}

.container.right-panel-active .overlay--left {
    transform: translateX(0);
}

.overlay--right {
    right: 0;
    transform: translateX(0);
}

.container.right-panel-active .overlay--right {
    transform: translateX(20%);
}

.btn {
    background-color: var(--blue);
    background-image: linear-gradient(90deg, var(--blue) 0%, var(--lightblue) 74%);
    border-radius: 20px;
    border: 1px solid var(--blue);
    color: var(--white);
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: bold;
    letter-spacing: 0.1rem;
    padding: 0.9rem 4rem;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
}

.form>.btn {
    margin-top: 1.5rem;
}

.btn:active {
    transform: scale(0.95);
}

.btn:focus {
    outline: none;
}

.form {
    background-color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 3rem;
    height: 100%;
    text-align: center;
}

.input {
    background-color: #fff;
    border: none;
    padding: 0.9rem 0.9rem;
    margin: 0.5rem 0;
    width: 100%;
}

@keyframes show {

    0%,
    49.99% {
        opacity: 0;
        z-index: 1;
    }

    50%,
    100% {
        opacity: 1;
        z-index: 5;
    }
}

span {
    font-family: "楷体";
}
</style>