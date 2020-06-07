<template>
  <div class="NewAppointmentContainer">
    <Navbar></Navbar>
    <div class="NewAppointmentCardContainer">
        <div class="NewAppointentCard">
            <h4>Registro de cita</h4>
            <div class="GlobalCenter">
                <input type="date" placeholder="Fecha" v-model="newMeeting.date">
            </div>
             <div class="GlobalCenter">
                <input type="time" placeholder="Hora" v-model="newMeeting.hour">
            </div>
            <div>
                <select v-model="newMeeting.doctor">
                    <option disabled selected value="">Psicólogo seleccionado</option>
                    <option v-for="doctor in doctors" v-bind:key="doctor.email" :value="doctor">{{doctor.name}}</option>
                </select>
            </div>
            <div class="NewActions">
                <button @click="saveMeeting()">Registrar visita</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
export default {
  name: 'NewAppointment',
    data () {
    return {
        newMeeting:{
            date: '',
            hour: '',
            doctor: '',
            started: false,
            roomNumber:null,
            patient: ''
        }
    }
  },
  components: {
    Navbar
  },
  methods: {
      saveMeeting(){
          console.log(this.newMeeting);
          if(this.validateMeeting()){
              this.newMeeting.patient = this.user.name;
              this.$store.dispatch('NEW_APPOINTMENT',this.newMeeting)
          }
      },
      validateMeeting(){
          let flag = true;
          if(this.newMeeting.date == ''){
            flag = false;
          }
          if(this.newMeeting.hour == ''){
            flag = false;
          }
          if(this.newMeeting.doctor == ''){
            flag = false;
          }
          return flag;
      }
  },
  mounted() {
  },
  computed: {
    doctors  ()  {
      if(this.$store.getters.DOCTORS !== null){
        return this.$store.getters.DOCTORS.filter(doc => doc.email != this.user.email)
      }else{
        return this.$store.getters.DOCTORS  
      }
      
    
    },
    user  ()  {
      return this.$store.getters.USER
    },
  }

}
</script>

<style lang="css">

    h4{
        color: #4b85a8;
        text-align: center;
        font-size: 1.5rem;
        margin-bottom: 3rem;
        margin-top: 2rem;
    }

    input{
        padding: 15px;
        margin-bottom: 2rem;
        border-radius: 6px;
        border: 2px solid #4b85a8;
        margin-left: 10%;
        font-size: 1rem;
        width: 77%;
        background: #ffffff;
    }

    .NewAppointmentCardContainer select{
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        padding: 15px;
        margin-bottom: 2rem;
        border-radius: 6px;
        border: 2px solid #4b85a8;
        width: 81% !important;
        margin-left: 10%;
        font-size: 1rem;
        background: #ffffff;
    }

    .NewAppointmentCardContainer{
        height: 48rem;
        display: flex;
        flex-direction: column;
        align-content: center;
        align-items: center;
        justify-content: center;
    
    }

    .NewAppointentCard{
        width: 60%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        background: rgba(75,133,168,.2);
        padding-bottom: 2rem;
        margin-bottom: 6rem;
    }

     .NewActions button{
        margin-top: 2rem;
        padding: 10px;
        border-radius: 6px;
        border: 1px solid #d98100;
        cursor: pointer;
        background: #d98100;
        color: #ffffff;
        font-size: 1rem;
        width: 50%;
        margin-left: 25%;
        margin-right: 25%;
    }

    @media only screen and (max-width: 600px) {
      
    }

    @media only screen and (max-width: 960px) {
        .NewAppointentCard{
            width: 90%;
            padding-top: 4rem;
            margin-top: 4rem;
        }

        input{
            width: 70%;
        }
     
    }

    @media only screen and (max-width: 1264px) {
    
    }
</style>