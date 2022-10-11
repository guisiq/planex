<template>


  <div style="width: 100vw;
              height: 100vh;
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;">
  <div style="width: 35%;
              height: 300px;
              background: #fff;">
  <div style="display: flex;align-items: center;flex-direction: column;align-content:center;">

    <H1>PlanEx</H1>
    <h3>Planejamento de Experimentos</h3>
    <P style="text-align: justify;"> PlanEx é um ambiente Web que contém as ferramentas características de Planejamento Fatorial 2^K e delineamento composto central (DCC) e composto central rotacional (DCCR)</P>
    <div> 
      <v-btn
        block
        color="secondary"
        elevation="5"
        x-large
        to="/dcc"
      >Delineamento Composto Central (DCC)</v-btn>
    </div>
  </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      
    }),
  }
</script>
