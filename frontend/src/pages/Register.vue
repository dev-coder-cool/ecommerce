<template>
  <div class="register-page">

    <div class="register-form-outer">

      <h1 class="title">Sign up</h1>

      <form id="register" class="register-form" @submit.prevent="submit">

        <div class="form-group">
          <label for="fullname-input">Full Name</label>
          <input type="text" id="fullname-input" v-model="$v.fullname.$model">
        </div>

        <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
          <label for="email-input">Email</label>
          <input type="text" autocomplete="email" id="email-input" v-model.trim="$v.email.$model">
        </div>

        <div class="error" v-if="!$v.email.required">Email is required</div>
        <div class="error" v-if="!$v.email.email">Email format is invalid.</div>
        <div class="error" v-if="!$v.email.minLength">Email must be at least {{$v.email.$params.minLength.min }} characters long.</div>

        <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
          <label for="password-input">Password</label>
          <input type="password" autocomplete="new-password" id="password-input" v-model.trim="$v.password.$model">
        </div>

        <div class="error" v-if="!$v.password.required">Password is required</div>
        <div class="error" v-if="!$v.password.minLength">Password must be at least {{$v.password.$params.minLength.min }} characters long.</div>

        <div class="form-group" :class="{ 'form-group--error': $v.repeatPassword.$error }">
          <label for="repeat-password-input">Repeat password</label>
          <input type="password" autocomplete="new-password" id="repeat-password-input" v-model.trim="$v.repeatPassword.$model">
        </div>

        <div class="error" v-if="!$v.repeatPassword.required">You need to confirm your password by repeating it.</div>
        <div class="error" v-if="!$v.repeatPassword.sameAsPassword">Passwords don't match!</div>

        <div class="form-group">
          <input class="submit-form-button" label="Register" type="submit"/>
        </div>
      </form>


      <div class="dont-have-acc-box">Already have an account? <router-link to="/login">Sign in!</router-link></div>

    </div>

  </div>
</template>


<script>
import { required, sameAs, email, minLength } from 'vuelidate/lib/validators'
// const axios = require('axios').default;


export default {

  name: 'Register',

  data ()  {
    return {
      fullname: '',
      email: '',
      password: '',
      repeatPassword: '',
      errors: [],
    }
  },

  validations: {
    fullname: {
      required,
      minLength: minLength(4)
    },
    email: {
      required,
      minLength: minLength(4),
      email
    },
    password: {
      required,
      minLength: minLength(6),
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs('password')
    }
  },

  methods: {
    submit: function () {
      if (this.email && this.password && this.repeatPassword && this.fullname) {
        this.$store.dispatch('AUTH_CREATE', { email: this.email, password: this.password })
          .then(() => {
            this.$router.push('/')
          })
          .catch((error) => {
            console.error(error)
          })
      }
    }
  },
}
</script>


<style lang="scss" scoped>


.dont-have-acc-box {
  text-align: center;
  margin-top: 2rem;
  opacity: 0.75;
}

  .register-form-outer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;


    .form-group {
      margin-top: 1.2rem;
      width: 300px;
      max-width: 90vw;

      border: 1px solid transparent;

      label {
        display: block;
        color: #5f5f5f;
        font-size: 1.2rem;
        font-weight: 400;
        padding: 5px 2px;
      }

      input[type=text], input[type=password] {
        outline: none;
        border: 2px solid #5f5f5f;
        border-radius: 5px;
        height: 3rem;
        font-size: 1.8rem;
        width: 100%;
        padding: 5px;
      }
    }

    .form-group--error {

      > input[type=text], input[type=password] {
        border: 2px solid orangered;
      }
    }

    .error {
      display: absolute;
      padding: 5px;
      font-weight: 600;
      /* font-style: italic; */
      font-size: 0.8rem;
      color: orangered;
    }


    .submit-form-button {
      width: 100%;
      color: #fff;
      font-weight: 800;
      padding: 1rem 2rem;
      outline: none;
      border: none;
      border-radius: 5px;
      background-color: #5F5CFF;
      transition: background-color 0.2s ease-in-out;
      cursor: pointer;

      &:hover {
        background-color: #4facfe;
        transition: background-color 0.2s ease-in-out;
      }

      &:active {
        box-shadow: 0px 0px 0px 2px #a3a3a3;
      }

      &:focus {
        box-shadow: 0px 0px 0px 2px #5f5f5f;
      }
    }
  }
</style>
