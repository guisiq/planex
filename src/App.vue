<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> planex </v-list-item-title>
          <v-list-item-subtitle>
            planejamento de experimentos fatoriais
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <!--


        <router-link
              exact
              :key="i"
              class="nav-link"
              exact-active-class="active"
              :to="{ name: router.name }"
              v-for="(router, i) in routes">
              <b-icon :icon="router.icon"></b-icon>
              {{ router.title }} 
        </router-link>
        -->
        <v-list-item v-for="(item, i) in routes" :key="item.title" :to="{ name: item.name }" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{$router.history.current.meta.title}}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  export default {
    computed:{
       routes () {
        return this.$router.options.routes;
      }
    },
    data: () => ({
       drawer: null
       }),

  }
</script>