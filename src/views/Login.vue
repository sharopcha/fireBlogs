<template>
  <div class="form-wrap">
    <form class="login">
      <p class="login-register">
        Don't havr an account?
        <router-link class="router-lin" :to="{ name: 'Register' }"
          >Register</router-link
        >
      </p>
      <h2>Login to FireBlog</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <Envelope class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <Lock class="icon" />
        </div>
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }"
        >Forgot password?</router-link
      >
      <button @click.prevent="signIn">Sign In</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
  import Envelope from '../assets/Icons/envelope-regular.svg';
  import Lock from '../assets/Icons/lock-alt-solid.svg';
  import firebase from 'firebase/app';
  import 'firebase/auth';
  export default {
    name: 'Login',
    components: {
      Envelope,
      Lock,
    },
    data() {
      return {
        email: '',
        password: '',
        errorMsg: '',
        error: null,
      };
    },
    methods: {
      async signIn() {
        if (this.email !== '' && this.password !== '') {
          firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(() => {
              this.$router.push({ name: 'Home' });
              this.errorMsg = '';
              this.error = false;
              console.log(firebase.auth().currentUser.uid);
            })
            .catch((err) => {
              this.error = true;
              this.errorMsg = err.message;
            });
        } else {
          this.error = true;
          this.errorMsg = 'Please fill out all the fields';
        }
      },
    },
  };
</script>

<style lang="scss">
  .form-wrap {
    overflow: hidden;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-self: center;
    margin: 0 auto;
    width: 90%;

    @media (min-width: 900px) {
      width: 100%;
    }

    .login-register {
      margin-bottom: 32px;

      .router-link {
        color: #000;
      }
    }

    form {
      padding: 0;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;

      @media (min-width: 900px) {
        padding: 0 50px;
      }

      h2 {
        text-align: center;
        font-size: 32px;
        color: #303030;

        @media (min-width: 900px) {
          font-size: 40px;
        }
      }

      .inputs {
        width: 100%;
        max-width: 350px;

        .input {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 8px;

          input {
            width: 100%;
            border: none;
            background-color: #f2f6f7;
            padding: 4px 4px 4px 30px;
            height: 50px;

            &:focus {
              outline: none;
            }
          }

          .icon {
            width: 12px;
            position: absolute;
            left: 6px;
          }
        }
      }

      .forgot-password {
        text-decoration: none;
        color: #000;
        cursor: pointer;
        font-size: 14px;
        margin: 16px 0 32px;
        border-bottom: 1px solid transparent;
        transition: 0.5s ease all;

        &:hover {
          border-color: #303030;
        }
      }

      .angle {
        display: none;
        position: absolute;
        background-color: #fff;
        transform: rotateZ(3deg);
        width: 60px;
        right: -30px;
        height: 101%;

        @media (min-width: 900px) {
          display: initial;
        }
      }
    }

    .background {
      display: none;
      flex: 2;
      background-size: cover;
      background-image: url('../assets/background.png');
      width: 100%;
      height: 100%;

      @media (min-width: 900px) {
        display: initial;
      }
    }
  }
</style>
