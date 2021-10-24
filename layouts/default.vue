<template>
  <div>
    <b-navbar type="is-link">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          WebPage Insights
        </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-item :href="item.path" v-for="(item, index) in navbar" :key="index" v-if="item.path">
          {{item.label}}
        </b-navbar-item>
        <b-navbar-dropdown :label="item.label" v-else>
          <b-navbar-item :href="item.path" v-for="(item, index) in item.items" :key="index" v-if="item.path">
            {{item.label}}
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>
    </b-navbar>
    <nuxt />
  </div>
</template>

<script>
export default {
  data () {
    return {
      navbar: [{
        label: 'Home',
        path: '/'
      }, {
        label: 'Documentação',
        path: '/docs'
      }, {
        label: 'Regras',
        items: [{
          label: 'Lista de regras',
          path: '/regras'
        }, {
          label: 'Customize',
          path: '/configure'
        }]
      }]
    }
  }
}
</script>
