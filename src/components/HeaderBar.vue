<template>
  <header v-if="user">
    <input placeholder="Search" v-model="searchQuery" debounce="500">
    <div>
      <span>{{user.userTitle}}</span>
      <img :src="user.imageUrl" :alt="user.userTitle"/>
      <a href="#" v-on:click.prevent="signOut">
        <i class="fa fa-sign-out" aria-hidden="true"></i>
      </a>
    </div>
  </header>
</template>
<script>
  import Auth from 'src/data/Auth'
  import EventBus from './EventBus'
  export default {
    data () {
      return {
        user: null,
        searchQuery: ''
      }
    },
    watch: {
      'searchQuery': function () {
        EventBus.$emit('search', this.searchQuery)
      }
    },
    methods: {
      processUser (authed) {
        if (authed === null) {
          this.user = null
          return
        }
        this.user = {
          userTitle: authed.providerData[0].displayName || authed.providerData[0].email || '', // if there's no displayName, take the email, if there's no email, use an empty string
          imageUrl: authed.providerData[0].photoURL || 'https://www.gravatar.com/avatar/' // Firebase 3 no longer supports auto Gravatar image fetch
        }
      },
      signOut () {
        Auth.signOut()
        this.$router.push('auth')
      }
    },
    created () {
      Auth.onAuth(this.processUser) // processUser everytime auth state changes (signs in or out)
      this.processUser(Auth.getAuth()) // processUser in case user is already signed in
    }
  }
</script>
<style>
  header{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1;
    height: 50px;
    background: #333;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,.4);
  }
  header input {
    display: block;
    width: 480px;
    margin: 0 auto;
    height: 30px;
    border: none;
    padding: 0 16px;
    border-radius: 2px;
  }
  header span {
    padding: 15px;
    color: #fff;
    position: absolute;
    right: 95px;
    top: 1px;
  }
  header img {
    width: 35px;
    height: 35px;
    border-radius: 20px;
    position: absolute;
    right: 60px;
    top: 8px;
  }
  header a {
    position: absolute;
    display: block;
    color: #fff;
    right: 15px;
    top: 10px;
    font-size: 25px;
    cursor: pointer;
    transition: color .2s;
  }
  header a:focus, header a:hover {
    color: #41b883;
  }
  @media screen and (max-width: 1200px) {
    header span{
      display: none;
    }
  }
  @media screen and (max-width: 720px) {
    header input{
      width: calc(100% - 64px);
      margin: 0 0 0 16px;
    }
    header span, header img {
      display: none;
    }
  }
</style>
