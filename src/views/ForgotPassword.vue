<template>
  <div class="reset-password">
    <Modal
      v-if="isModalActive"
      :modalMessage="modalMessage"
      v-on:close-modal="closeModal"
    />
    <Loading v-if="loading" />
    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          Back to
          <router-link class="router-lin" :to="{ name: 'Login' }"
            >Login</router-link
          >
        </p>
        <h2>Forgot your password</h2>
        <p>Forgot your password? Enter your email and reset it!</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <Envelope class="icon" />
          </div>
        </div>
        <button @click.prevent="resetPassword">Reset</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
  import Envelope from '../assets/Icons/envelope-regular.svg';
  import Modal from '../components/Modal';
  import Loading from '../components/Loading';
  import firebase from 'firebase/app';
  import 'firebase/auth';

  export default {
    name: 'ForgotPassword',
    components: {
      Envelope,
      Modal,
      Loading,
    },
    data() {
      return {
        email: null,
        isModalActive: false,
        modalMessage: '',
        loading: null,
      };
    },
    methods: {
      resetPassword() {
        this.loading = true;
        firebase
          .auth()
          .sendPasswordResetEmail(this.email)
          .then(() => {
            this.loading = false;
            this.isModalActive = true;
            this.modalMessage =
              'Check your email please. We sent you a password reset link!';
          })
          .catch((err) => {
            this.loading = false;
            this.isModalActive = true;
            this.modalMessage = err.message;
          });
      },
      closeModal() {
        this.isModalActive = !this.isModalActive;
        this.email = '';
      },
    },
  };
</script>

<style lang="scss" scoped>
  .reset-password {
    position: relative;
    .form-wrap {
      .reset {
        h2 {
          margin-bottom: 8px;
        }

        p {
          text-align: center;
          margin-bottom: 32px;
        }
      }
    }
  }
</style>
