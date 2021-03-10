<template>
  <div id="MyApp">
    <!--     <h1>Hello App!</h1>
    <p>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
    </p>
 -->
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
