<template>
  <div class="HomeContainer">
      <Navbar></Navbar>
      <div class="AllApointments">
        <div class="AppointentCard" v-for="cita in citas" v-bind:key="cita.date">
            <div class="DoctorData InnerAppointment">
                <h3 class="TextOverflow">{{cita.doctor.name}}</h3>
            </div>
            <div class="UserData InnerAppointment">
                <p class="TextOverflow">{{cita.patient}}</p>
            </div>
            <div class="AppointmentData InnerAppointment">
                <p class="TextOverflow">{{cita.date}}</p>
                <p class="TextOverflow">{{cita.hour}}</p>
            </div>
            <div class="Actions InnerAppointment">
                <button @click="openMeeting(cita)" v-if="user.type == 'psicologo'">Iniciar consulta</button>
                <button @click="openMeetingUser(cita)" v-if="user.type == 'usuario'" v-bind:class="{ active: cita.started }" class="ApointmentsGrayButton">Entrar a consulta</button>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
export default {
  name: 'Appointments',
    data () {
    return {
    }
  },
  components: {
      Navbar
  },
  methods: {
      openMeeting(cita){
          this.$store.dispatch('START_MEETING', cita);
      },
      openMeetingUser(cita){
          if(cita.started){
            this.$store.dispatch('START_MEETINGUSER', cita);
          }
      }
  },
  mounted() {
      this.$store.dispatch('GET_CITAS');
  },
  computed: {
    user  ()  {
      return this.$store.getters.USER
    },
    citas () {
        if(this.user.citas == null){
            return []
        }else{
            return this.user.citas
        }
    }
  }
  
}
</script>


<style lang="css">
    .AllApointments{
        display: flex !important;
        flex-direction: row !important;
        flex-flow: column;
        flex-wrap: wrap;
        margin-top: 3rem;
    }

    .DoctorData h3{
        margin-bottom: 0;
        font-weight: 500;
    }

    .AppointentCard{
        width: 30%;
        margin-left: 1.6%;
        margin-right: 1.6%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        background: rgba(75,133,168,.2);
        padding-bottom: 2rem;
        margin-bottom: 6rem;
    }

    .InnerAppointment{
        padding-left: 5%;
        padding-right: 5%;
    }

    .TextOverflow{
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
        display: block;
        overflow: hidden
    }

    .Actions button{
        margin-top: 1rem;
        padding: 10px;
        border-radius: 6px;
        border: 1px solid #d98100;
        cursor: pointer;
        background: #d98100;
        color: #ffffff;
        font-size: 1rem;
    }

    .ApointmentsGrayButton{
        background: lightgray !important;
        border: 1px solid lightgray !important;
    }

    .active{
        background: #d98100 !important;
        border: 1px solid #d98100 important;
    }

    @media only screen and (max-width: 600px) {
      
    }

    @media only screen and (max-width: 960px) {
        .AppointentCard{
            width: 90%;
            margin-left: 5%;
            display: flex;
            justify-content: center;
            margin-bottom: 4rem;
        }
    }

    @media only screen and (max-width: 1264px) {
    
    }

</style>