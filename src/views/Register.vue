<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-lin" :to="{ name: 'Login' }"
          >Login</router-link
        >
      </p>
      <h2>Your FireBlog Account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="First Name" v-model="firstName" />
          <User class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName" />
          <User class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Username" v-model="username" />
          <User class="icon" />
        </div>
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
      <button @click.prevent="register">Sign Up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
  import Envelope from '../assets/Icons/envelope-regular.svg';
  import Lock from '../assets/Icons/lock-alt-solid.svg';
  import User from '../assets/Icons/user-alt-light.svg';
  import firebase from 'firebase/app';
  import 'firebase/auth';
  import db from '../firebase/firebaseInit';

  export default {
    name: 'Register',
    components: {
      Envelope,
      Lock,
      User,
    },
    data() {
      return {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        error: null,
        errorMsg: '',
      };
    },
    methods: {
      async register() {
        const { firstName, lastName, email, username, password } = this;
        if (
          firstName !== '' &&
          lastName !== '' &&
          email !== '' &&
          username !== '' &&
          password !== ''
        ) {
          this.error = false;
          this.errorMsg = '';
          const firebaseAuth = await firebase.auth();
          const createUser = firebaseAuth.createUserWithEmailAndPassword(
            email,
            password
          );
          const res = await createUser;
          const database = db.collection('users').doc(res.user.uid);
          await database.set({
            firstName,
            lastName,
            email,
          });

          this.$router.push({ name: 'Home' });
          return;
        }
        this.error = true;
        this.errorMsg = 'Please fill out all the fields';
        return;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .register {
    h2 {
      max-width: 350px;
    }
  }</style
>>
