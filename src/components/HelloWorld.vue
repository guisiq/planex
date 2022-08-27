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

    <H1>Planex</H1>
    <h3>pranejamento de experimentos</h3>
    <P style="text-align: justify;
              ">esse e um site destinado a realizacao de experimentos fatoriais  </P>
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
