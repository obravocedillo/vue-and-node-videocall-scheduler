<template>
  <div>
    <router-view> </router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Navbar  from './components/Navbar.vue'
export default Vue.extend({
  name: 'App',
  components: {
    Navbar
  },
  data: () => ({
  }),
  created() {
    this.$store.dispatch('CHECKUSER')
  },
  computed: {
    loggedIn  ()  {
      return this.$store.getters.LOGGED_IN
    },
    loaded () {
      return this.$store.getters.LOADED
    }
  }
});
</script>


<style lang="css">
  body{
    margin: 0;
  }

  .v-application{
    overflow-x: hidden !important;
  }

  .GlobalRowCenter{
    justify-content: center;
    align-items:center;
    width: 100%;
  }

  .GlobalCenter{
    justify-content: center;
    align-items:center;
  }

  .PrimaryColor{
    color: #4b85a8;
  }

  .SecondaryColor{
    color:#d98100;
  }

  .TitleMedium{
    font-size: 2rem;
    font-weight: 500;
    border-bottom: 2px solid #4b85a8;;
    padding-bottom: .5rem;
  }

  .TextCentered{
    text-align: center;
  }

    @media only screen and (max-width: 600px) {
      
    }

    @media only screen and (max-width: 960px) {
        .TitleMedium{
          font-size: 1.8rem;
          font-weight: 500;
          border-bottom: 2px solid #4b85a8;
          padding-bottom: .5rem;
        }
    }

    @media only screen and (max-width: 1264px) {
    
    }

 
</style>