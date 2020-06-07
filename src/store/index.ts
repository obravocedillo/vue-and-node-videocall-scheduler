import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index' // Vue router instance
import axios from "axios";

Vue.use(Vuex)
/* eslint-disable */

function makeid(length:any){
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default new Vuex.Store({
  state: {
    loggedIn:false,
    user: null,
    currentRoom:null,
    loaded:false,
    doctors:null
  },
  getters: {
    LOGGED_IN : state => {
      return state.loggedIn;
    },
    CURRENT_ROOM : state => {
      return state.currentRoom;
    },
    USER : state => {
      return state.user;
    },
    LOADED : state => {
      return state.loaded;
    },
    DOCTORS : state => {
      return state.doctors;
    },
    /*
    LOADING : state => {
      return state.isLoading
    }
    */
  },
  mutations: {
    SET_LOGGED_IN : (state, payload) => {
      state.loggedIn = payload
    },
    SET_CURRENT_ROOM : (state, payload) => {
      state.currentRoom = payload
    },
    SET_USER : (state, payload) =>{
      state.user = payload;
    },
    SET_LOADED : (state, payload) =>{
      state.loaded = payload;
    },
    SET_DOCTORS : (state, payload) =>{
      state.doctors = payload;
    }
    /*
    SET_LOADING : (state, payload) => {
      state.isLoading = payload
    }
    */
  },
  actions: {
    START_MEETING : (context, payload) => {
      return new Promise((resolve, reject) => {
        if(payload.roomNumber == null){
          let tempRoom = makeid(30)
          let data = payload;
          data.roomNumber = tempRoom;
          axios({ method: "POST", "url": "http://localhost:3000/start_meeting", "data": data, "headers": {} }).then(response => {
            console.log(response);
            if(response.status == 200){
              context.commit('SET_CURRENT_ROOM',tempRoom)
              router.push({name: 'Meeting', params: { id: tempRoom }})
            }
          }, error => {
              console.error(error);
          });
        }else{
          context.commit('SET_CURRENT_ROOM', payload.roomNumber)
          router.push({name: 'Meeting', params: { id: payload.roomNumber }})
        }
      })
    },
    LOGIN : (context, payload) => {
      axios({ method: "POST", "url": "http://localhost:3000/login", "data": payload, "headers": {} }).then(response => {
        console.log(response);
        if(response.status == 200){
          localStorage.setItem('PSICOLOGIAUSER',JSON.stringify(response.data[0]));
          context.commit('SET_LOGGED_IN', true);
          context.commit('SET_USER', response.data[0])
          context.dispatch('GET_DOCTORS').then(()=>{
            router.push( { name: 'Home'} );
          })
        }
      }, error => {
          console.error(error);
      });
    },
    REGISTER : (context, payload) =>{
      axios({ method: "POST", "url": "http://localhost:3000/register", "data": payload, "headers": {} }).then(response => {
        if(response.status == 200){
          let tempUser = {
            id:response.data.insertedId,
            name:payload.name,
            email:payload.email,
            type:payload.type
          }
          localStorage.setItem('PSICOLOGIAUSER',JSON.stringify(tempUser));
          context.commit('SET_LOGGED_IN', true);
          context.commit('SET_USER', tempUser)
          context.dispatch('GET_DOCTORS').then(()=>{
            router.push( { name: 'Home'} );
          })
        }else{
          console.log('ERROR')
        }
      }, error => {
          console.error(error);
      });
    },
    LOGOUT : (context, payload) => {
      localStorage.removeItem('PSICOLOGIAUSER');
      context.commit('SET_LOGGED_IN',false);
      context.commit('SET_USER',null);
      router.push( { name:'Login' } )
    },
    CHECKUSER: (context, payload) => {
      return new Promise((resolve, reject) => {
        if(localStorage.getItem('PSICOLOGIAUSER')){
          context.commit('SET_LOGGED_IN',true);
          context.dispatch('GET_DOCTORS');
          var tempUser:any = localStorage.getItem('PSICOLOGIAUSER');
          context.commit('SET_USER',JSON.parse(tempUser))
        }
        context.commit('SET_LOADED',true);
        resolve('Terminado')
      })
    },
    GET_DOCTORS: (context, payload) => {
      return new Promise((resolve, reject) => {
        axios({ method: "GET", "url": "http://localhost:3000/get-doctors", "data": payload, "headers": {}}).then(response => {
          console.log(response);
          if(response.status == 200){
            context.commit('SET_DOCTORS',response.data);
            resolve('Éxito')
          }else{
            console.log('ERROR')
          }
        }, error => {
            resolve('Error')
            console.error(error);
        });
      })
    },
    NEW_APPOINTMENT: (context, payload) => {
      let data = {
        date: payload.date,
        hour: payload.hour,
        doctor: payload.doctor,
        started: false,
        email: context.getters.USER.email,
        patient: payload.patient
      }
      return new Promise((resolve, reject) => {
        axios({ method: "POST", "url": "http://localhost:3000/register-date", "data": data, "headers": { "content-type": "application/json" }}).then(response => {
          if(response.status == 200){
            let tempUser = context.getters.USER;
            tempUser.citas = response.data;
            context.commit('SET_USER',tempUser);
            localStorage.setItem('PSICOLOGIAUSER',JSON.stringify(tempUser));
            router.push( { name:'Appointments' } )
            resolve('Éxito')
          }else{
            console.log('ERROR')
          }
        }, error => {
            resolve('Error')
            console.error(error);
        });
      })
    },
    INITIATE_DATA: (context, payload) => {
      context.dispatch('GET_DOCTORS');
    },
    GET_CITAS: (context, payload) =>{
      let data = {
        email: context.getters.USER.email
      }
      axios({ method: "POST", "url": "http://localhost:3000/get-citas", "data": data, "headers": {}}).then(response => {
        console.log(response);
        if(response.status == 200){
          let tempUser = context.getters.USER;
          tempUser.citas = response.data[0].citas;
          localStorage.setItem('PSICOLOGIAUSER',JSON.stringify(tempUser));
          context.commit('SET_USER',tempUser);
        }else{
          console.log('ERROR')
        }
      }, error => {
          console.error(error);
      });
    },
    START_MEETINGUSER: (context, payload) =>{
      if(payload.started){
        context.commit('SET_CURRENT_ROOM', payload.roomNumber)
        router.push({name: 'Meeting', params: { id: payload.roomNumber }})
      }
    }
    /*
    LOGOUT_USER : (context, param) => {
      context = this
      param = parametros pasados a la acción
    } 
    */
  }
})
