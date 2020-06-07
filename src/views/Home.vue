<template>
  <div class="HomeMainContainer">
    <Navbar></Navbar>
    <div class="HomeContainer">
      <img src="../assets/back.jpg" alt="Main Image">
      <div class="HomeImageTop">
          <h3>Una mente sana es un cuerpo sano, una descripción corta <br> pero completa de un estado feliz</h3>
      </div>
    </div>
    <div class="HomeBottomRow">
        <div class="HomeBottomColumn">
          <p>Realiza citas con psicólogos especializados, el día y hora <br> que tu quieras</p>
        </div>
         <div class="HomeBottomColumn">
           <p>Todo desde la comodidad de tu casa, sin ariesgarte a ti y a tus <br> seres queridos</p>
        </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
export default {
  name: 'Home',
    data () {
    return {
    }
  },
  components: {
    Navbar
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style lang="css">
  .HomeContainer{
    width: 100%;
    height: 30rem;
  }
  .HomeContainer img{
      width: 100%;
      height: 30rem;
      position: absolute;
      object-fit: cover;
  }
  .HomeImageTop{
    width: 100%;
    height: 30rem;
    position: absolute;
    background: rgba(0,0,0,.5);
    z-index: 2;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
  }
  .HomeImageTop h3{
    padding-left: 5%;
    padding-right: 5%;
    text-align: center;
    color:#ffffff;
    font-size: 2.2rem;
    font-weight: 500;
  }
  .HomeBottomRow{
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    height: 15rem;
  }
  .HomeBottomColumn{
    width: 50%;
    padding-left: 5%;
    padding-right: 5%;
    display: flex;
    align-items: center;
    align-content: center;
  }

  .HomeBottomColumn p{
    text-align: center;
    color: #4b85a8;
    font-size: 1.2rem;
  }

  @media only screen and (max-width: 600px) {

  }

  @media only screen and (max-width: 960px) {
        

  }

  @media only screen and (max-width: 1264px) {
    
  }

</style>