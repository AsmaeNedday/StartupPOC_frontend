<template>
  <div class="home">
    <div class="homeLeft">
      <h2>Welcome to the POC startup project</h2>
      <p>Administrate your employees, your projects and more ... </p>
    </div>
    <div class="homeRight">
      <img src="../assets/POC.gif" alt="img" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  methods:{

  }
}
</script>

<style scoped>
.home {
  height: 100vh;
  width: 100%;
  background: rgb(238, 238, 238);
  display: flex;  
}
.home img {
  position: absolute;
  margin: auto;
  left: 50%;
}
.homeLeft {
  position: absolute;
  top: 40%;
  left: 20%;
}
</style>