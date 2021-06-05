<template>
  <div class="reset-password">
    <Modal v-if="isModalActive" v-on:close-modal="closeModal" />
    <Loading v-if="loading" />
    <div class="form-wrap">
      <form class="reset">
        <h2>Forgot your password</h2>
        <p>Forgot your password? Enter your email and reset it!</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <Envelope class="icon" />
          </div>
        </div>
        <button>Reset</button>
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
        isModalActive: true,
        modalMessage: '',
        loading: null,
      };
    },
    methods: {
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
