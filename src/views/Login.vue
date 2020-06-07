<template>
    <div class="LoginContainer">
        <div class="BackImage"></div>
        <Navbar></Navbar>
        <div v-if="loginOpen">
            <div class="LoginCard">
                <h3 class="LoginTitle">Iniciar sesión</h3>
                <div class="LoginInputs">
                    <input type="email" placeholder="Email" class="LoginInput" v-model="loginUser.email">
                    <input type="password" placeholder="Contraseña" class="LoginInput"  v-model="loginUser.password">
                </div>
                 <div class="LoginButton">
                    <button @click="loginUserButton()">Inciar sesión</button>
                </div>
            </div>
            <div class="LoginNoAccount">
                <span @click="changeView()">¿Aun no tienes una cuenta?</span>
            </div>
        </div>
        <div v-if="registerOpen">
            <div class="RegisterCard">
                <h3 class="LoginTitle">Registrarse</h3>
                <div class="LoginInputs">
                    <input type="text" placeholder="Nombre" class="LoginInput" v-model="newUser.name">
                    <input type="email" placeholder="Email" class="LoginInput" v-model="newUser.email">
                    <input type="password" placeholder="Contraseña" class="LoginInput" v-model="newUser.password">
                    <select name="usertype" v-model="newUser.type">
                        <option disabled selected value="">Tipo de usuario</option>
                        <option value="psicologo">Psicólogo</option>
                        <option value="usuario">Usuario</option>
                    </select>
                    <div class="LoginButton">
                        <button @click="registerUser()">Registrarse</button>
                    </div>
                </div>
            </div>
            <div class="LoginNoAccount">
                <span @click="changeView()">Ya tengo una cuenta</span>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
export default {
    name: 'Login',
    data () {
    return {
        loginOpen: true,
        registerOpen: false,
        newUser:{
            name: '',
            email: '',
            password: '',
            type: ''
        },
        loginUser:{
            email: '',
            password: ''
        }
    }
    },
    components: {
        Navbar
    },
    methods: {
        changeView () {
            this.loginOpen = !this.loginOpen;
            this.registerOpen = !this.registerOpen;
        },
        registerUser()  {
            if(this.validateRegister){
                this.$store.dispatch('REGISTER',this.newUser);
            }
        },
        loginUserButton() {
            if(this.validateLogin()){
                this.$store.dispatch('LOGIN',this.loginUser);
            }
        },
        validateLogin() {
            var flag = true;
            if(!this.validateEmail(this.loginUser.email)){
                flag = false
            }
            if(this.loginUser.password.length == 0){
                flag = false
            }
            return flag;
        }, 
        validateRegister() {
            var flag = true;
            if(this.newUser.name.length == 0){
                flag = false;
            }
            if(!this.validateEmail(this.newUser.email)){
                flag = false
            }
            if(this.newUser.password.length <= 5){
                flag = false;
            }
            if(this.newUser.type == ''){
                flaf = false;
            }
            return flag;
        },
        validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
    },
    created() {
        if(this.loggedIn){
            this.$router.push( { name:'Home' } )
        }
    },
    computed: {
        loggedIn  ()  {
            return this.$store.getters.LOGGED_IN
        }
  },
}
</script>

<style lang="css">
    
    .LoginContainer{
        min-height: 100vh;/* The image used */
    }

    .RegisterCard{
        width: 50%;
        margin-left: 25%;
        text-align: center;
        margin-top: 6rem;
        border: 2px solid #e2e2e2;
        background: #E8E8E8;
        border-radius: 6px;
    }

    .LoginCard{
        width: 50%;
        margin-left: 25%;
        text-align: center;
        margin-top: 6rem;
        border: 2px solid #e2e2e2;
        background: #F8F8F8;
        border-radius: 6px;
    }

    .LoginTitle{
        color: #4b85a8;
        font-size: 2rem;
        font-weight: 500;
    }

    .LoginInputs{
        display: flex;
        flex-direction: column;
    }

    .LoginInput{
        padding: 15px;
        margin-bottom: 2rem;
        border-radius: 6px;
        border: 2px solid #4b85a8;
        width:80%;
        margin-left: 10%;
        font-size: 1rem;
    }

    button{
        padding: 10px;
        min-width: 30%;
        font-size: 1rem;
        border-radius: 6px;
        background: #4b85a8;
        border: 1px solid #4b85a8;
        color: #ffffff;
        margin-bottom: 3rem;
        cursor: pointer;
    }

    .LoginNoAccount{
        width: 50%;
        margin-left: 25%;
        text-align: center;
        display: flex;
        justify-content: center;
        margin-top: 1.2rem;
    }

    .LoginNoAccount span{
        color: #4b85a8;
        font-size: 1.2rem;
    }

    select{
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none; padding: 15px;
        margin-bottom: 2rem;
        border-radius: 6px;
        border: 2px solid #4b85a8;
        width:85%;
        margin-left: 10%;
        font-size: 1rem;
        background: #ffffff;
    }


    @media only screen and (max-width: 600px) {
      
    }

    @media only screen and (max-width: 960px) {
        .LoginCard{
            width: 90%;
            margin-left: 5%;
        }

        .LoginInput{
            margin-left: 5%;
        }

        select{
            width:90%;
            margin-left: 5%;
            font-size: 1rem;
            background: #ffffff;
        }

        .RegisterCard{
            width: 90%;
            margin-left: 5%;
        }

    }

    @media only screen and (max-width: 1264px) {
    
    }

</style>