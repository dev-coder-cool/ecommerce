<template>
  <div class="login-page">

    <div class="login-form-outer">


      <h1 class="title">Sign in</h1>

      <form id="login" class="login-form" @submit.prevent="submit">

        <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
          <label for="email-input">Email</label>
          <input type="text" autocomplete="email" id="email-input" v-model.trim="$v.email.$model">
        </div>

        <div class="error" v-if="!$v.email.required">Email is required</div>
        <div class="error" v-if="!$v.email.minLength">Email must be at least {{$v.email.$params.minLength.min }} characters long.</div>

        <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
          <label for="password-input">Password</label>
          <input type="password" autocomplete="current-password" id="password-input" v-model.trim="$v.password.$model">
        </div>

        <div class="error" v-if="!$v.password.required">Password is required</div>
        <div class="error" v-if="!$v.password.minLength">Password must be at least {{$v.password.$params.minLength.min }} characters long.</div>

        <div class="form-group">
          <input class="submit-form-button" label="Sign in" type="submit"/>
        </div>
      </form>

      <div class="dont-have-acc-box">Don't have an account? <router-link to="/register">Sign up now.</router-link></div>


      <transition name="wobbleHor">
        <div v-if="authError" class="auth-error">
          Email or password incorrect!
        </div>
      </transition>
    </div>

  </div>
</template>


<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {

  name: 'LoginForm',

  data ()  {
    return {
      email: '',
      password: '',
      showResult: false,
      resEmail: '',
      resToken: '',
      authError: false
    }
  },


  validations: {
    email: {
      required,
      minLength: minLength(4)
    },
    password: {
      required,
      minLength: minLength(6),
    }
  },
  methods: {
    submit: function () {
      this.authError = false;
      // validate input and only then send to API
      if (this.email && this.password) {
        this.$store.dispatch('AUTH_REQUEST', { email: this.email, password: this.password })
          .then(() => {
            this.authError = false;
            this.$router.push('/')
          })
          .catch((error) => {
            this.authError = true;
            console.error(error)
          })
      }
    },
  },
}
</script>


<style lang="scss" scoped>



.auth-error {
  font-size: 2rem;
  background-color: orangered;
  border-radius: 3px;
  padding: 1rem 2rem;
  font-weight: 500;
  margin: 2rem 0;
  color: #fff;
}

.dont-have-acc-box {
  margin-top: 2rem;
  opacity: 0.75;
}

  .login-form-outer {
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

  .wobbleHor-enter-active {
    animation: wobble-hor-bottom 0.8s;
  }

  .wobbleHor-leave-active {
    animation: wobble-hor-bottom 0.8s reverse;
  }

@keyframes wobble-hor-bottom {
  0%,
  100% {
    transform: translateX(0%);
    transform-origin: 50% 50%;
  }
  15% {
    transform: translateX(-30px) rotate(-6deg);
  }
  30% {
    transform: translateX(15px) rotate(6deg);
  }
  45% {
    transform: translateX(-15px) rotate(-3.6deg);
  }
  60% {
    transform: translateX(9px) rotate(2.4deg);
  }
  75% {
    transform: translateX(-6px) rotate(-1.2deg);
  }
}

</style>
