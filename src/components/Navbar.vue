<template>
    <div>
        <div class="NavContainer">
            <span class="TitleName" @click="openRoute('Home')" data-testid="main-title">Psicólogo online</span>
            <div class="spacer"></div>
            <span class="NavItem" v-if="loggedIn" @click="openRoute('Appointments')" data-testid="main-navigation">>Mis citas</span>
            <span class="NavItem" v-if="loggedIn" @click="openRoute('NewAppointment')" data-testid="main-navigation">Programar cita</span>
            <span class="NavItem" @click="logout()" v-if="loggedIn" data-testid="main-navigation">Cerrar sesión</span>
            <span class="MobileMenu" @click="openMobile()" v-if="loggedIn" data-testid="main-navigation">Menu</span>
        </div>  
        <transition name="fade" enter-active-class="fadeInUp">
            <div v-if="mobileMenuOpen" style="animation-duration: 0.3s">
                <span class="SpanMobileMenu" v-if="loggedIn" @click="openRoute('Appointments')">Mis citas</span>
                <span class="SpanMobileMenu" v-if="loggedIn" @click="openRoute('NewAppointment')">Programar Cita</span>
                <span class="SpanMobileMenu" @click="logout()" v-if="loggedIn">Cerrar sesión</span>
            </div>
        </transition>
    </div>
  
</template>

<script>
export default {
  name: 'Navbar',
    data () {
    return {
        mobileMenuOpen: false,
    }
  },
  components: {
  },
  computed: {
    loggedIn  ()  {
      return this.$store.getters.LOGGED_IN
    }
  },
  methods: {
      openMobile(){
          this.mobileMenuOpen = !this.mobileMenuOpen;
      },
      logout(){
          this.$store.dispatch('LOGOUT');
      },
      openRoute(router){
          this.$router.push( { name:router } )
      }
  },
  mounted() {
  }
}
</script>

<style lang="css">
    .NavContainer{
        display: flex;
        flex-direction: row;
        align-content: center;
        height: 69px;
        padding-right: 4%;
        padding-left: 4%;
        background: #4b85a8;
        z-index: 1000000;
    }
    
    .NavItem{
        margin-right: 3%;
    }

    .NavItem:hover{
        transform: scale(1.15);
    }

    span{
        font-size: 1.4rem;
        display: flex;
        align-content: center;
        align-items: center;
        color: #ffffff;
        cursor: pointer;
    }

    .TitleName{
        font-size: 1.5rem;
    }

    .spacer{
        flex: 1;
    }
    
    .MobileMenu{
        display: none;
    }

    @media only screen and (max-width: 600px) {
      
    }

    @media only screen and (max-width: 960px) {
       .TitleName{
            font-size: 1.5rem;
        }   

        .NavItem{
           display: none;
        }

        .MobileMenu{
            display: flex;
        }

        .SpanMobileMenu{
            display: flex;
            align-items: center;
            align-content: center;
            background: #ffffff;
            color: #4b85a8;
            font-size: 1.4rem;
            padding-bottom: .8rem;
            padding-top: .8rem;
            padding-left: 5%;
            z-index: 100000;
        }
    }

    @media only screen and (max-width: 1264px) {
    
    }

</style>