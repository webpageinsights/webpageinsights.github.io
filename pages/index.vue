<template>
  <div class="container">
    <section class="section">
      <h1 class="title">Suas páginas usam boas práticas de SEO? </h1>
      <b-tabs v-model="activeTab">
        <b-tab-item label="URLs">
          <div class="field">
            <b-field label="Insira 1 url por linha até 10 linhas.">
              <b-input v-model="urls" type="textarea"></b-input>
            </b-field>
          </div>
          <b-button
            label="Testar urls"
            type="is-info"
            :disabled="areAllUrlsValid === false"
          />
        </b-tab-item>
        <b-tab-item label="Código HTML">
          <div class="field">
            <b-field label="Insira código HTML válido">
              <b-input v-model="html" type="textarea"></b-input>
            </b-field>
          </div>
          <b-button
            label="Testar código"
            type="is-info"
            :disabled="areAllUrlsValid === false"
          />
        </b-tab-item>
      </b-tabs>
    </section>
  </div>
</template>

<script type="typescript">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      urls: '',
      activeTab: 0
    }
  },
  computed: {
    areAllUrlsValid() {
      const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
      return this.urlsLists.every(url => url.match(urlPattern))
    },
    urlsLists() {
      return this.urls.split('\n')
    }
  }
})
</script>
