<template>
  <div class="forbidden">
    <div class="container">
      <h2>Ooops ! You don't have the right privileges</h2>
      <h1>403</h1>
      <p>You can not access this page.</p>
      <router-link class="button" to="/">Home page</router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.forbidden {
  height: 100vh;
  font-family: "montserrat", sans-serif;
  background-image: linear-gradient(
    125deg,
    rgba(184, 207, 207, 0.867),
    rgb(42, 40, 36)
  );
}
.container {
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  color: #343434;
}
.container h1 {
  font-size: 160px;
  margin: 0;
  font-weight: 900;
}

.button {
    text-decoration: none;
    border-radius: 10px;
    background-color: white;
    color: black;
    padding: 10px;
    transition: 0.9s ease-out;
}

.button:hover {
    background-color: #343434;
    color: white;
}
</style>