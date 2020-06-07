<template>
  <div class="MeetingContainer">
    <Navbar></Navbar>
    <div id="meet">
        
    </div>
    <div class="MeetingEnd">
        <button>Terminar consulta</button>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
export default {
    name: 'Meeting',
        data () {
        return {
            room:''
        }
    },
    components: {
        Navbar
    },
    methods: {
    },
    computed: {
    },
    mounted() {
        this.room = this.$route.params.id;
        const domain = 'meet.jit.si';
        const options = {
            roomName: this.room,
            width: "70em",
            height: "40em",
            parentNode: document.querySelector('#meet')
        };
        const api = new JitsiMeetExternalAPI(domain, options);    
    }
}
</script>

<style lang="css">
    #meet{
        text-align: center;
        margin-top: 2rem;
    }
    .MeetingEnd{
        margin-top: 2rem;
        width: 100%;
        text-align: center;
    }
    .MeetingEnd button{
        padding: 12px;
        margin-bottom: 2rem;
        background: #4b85a8;
        border: 1px solid #4b85a8;
        color: #ffffff;
        border-radius: 6px;
        min-width: 20%;
        font-size: .9rem;
        cursor: pointer;
    }

    @media only screen and (max-width: 600px) {
      
    }

    @media only screen and (max-width: 960px) {
    
        #meet iframe{
            width: initial !important;
        }
    }

    @media only screen and (max-width: 1264px) {
    
    }
</style>