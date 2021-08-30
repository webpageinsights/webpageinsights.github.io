<template>
  <div class="container">
    <section class="section">
      <h1 class="title">Suas páginas usam boas práticas de SEO? </h1>
      <b-tabs v-model="activeTab">
        <b-tab-item label="URLs" icon="format-list-bulleted-square">
          <div class="field">
            <b-field label="Insira 1 url por linha até 10 linhas.">
              <b-input v-model="urls" type="textarea" :disabled="isLoading"></b-input>
            </b-field>
          </div>
          <b-button
            label="Testar urls"
            type="is-info"
            :disabled="areAllUrlsValid === false"
            @click="processUrls"
          />
        </b-tab-item>
        <b-tab-item label="Código HTML" icon="code-tags">
          <div class="field">
            <b-field label="Insira código HTML válido">
              <b-input v-model="html" type="textarea" :disabled="isLoading"></b-input>
            </b-field>
          </div>
          <b-button
            label="Testar código"
            type="is-info"
            :disabled="areAllUrlsValid === false"
          />
        </b-tab-item>
        <b-tab-item label="Configurações" icon="cog">

          <b-collapse
            class="card"
            animation="slide"
            v-for="(rule, index) in rules"
            :key="index"
            :open="isRulesOpen == index"
            @open="isRulesOpen = index">
            <template #trigger="props">
              <div
                class="card-header"
                role="button"
              >
                <p class="card-header-title">
                  {{ rule.title }}
                </p>
                <a class="card-header-icon">
                  <b-icon
                    :icon="props.open ? 'menu-down' : 'menu-up'">
                  </b-icon>
                </a>
              </div>
            </template>
            <div class="card-content">
              <div class="content">
                <div v-if="rule.options">
                  <b-field v-for="(option, index) in rule.options" :key="index">
                    <b-checkbox v-model="option.isChecked">
                      <span v-html="option.label"></span>
                    </b-checkbox>
                  </b-field>
                </div>
                <div v-else>
                  {{ rule.text }}
                </div>
              </div>
            </div>
          </b-collapse>

        </b-tab-item>
      </b-tabs>
    </section>
    <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false"></b-loading>
  </div>
</template>

<script type="typescript">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      urls: '',
      html: '',
      activeTab: 0,
      isLoading: false,
      isRulesOpen: false,
      rules: [
        {
          title: 'Cabeçalhos HTML',
          options: [{
            isChecked: true,
            label: 'Toda página deve ter 1 e somente 1 tag &lt;h1&gt;'
          },{
            isChecked: true,
            label: 'Toda página deve ter 1 e somente 1 tag &lt;title&gt;'
          }]
        },
        {
          title: 'Metadados básicos',
          options: [{
            isChecked: true,
            label: 'Toda página deve ter um meta description com conteúdo'
          }]
        }
      ]
    }
  },
  methods: {
    async processUrls() {
      const appScriptId = 'AKfycbzAjIXbOKHT4wSkGoKTkKeXWGuEr5-suBX7BOqew6stjxdLyEBUYSxfgyUCBnC1crNP';
      const url = `https://script.google.com/macros/s/${appScriptId}/exec?url=${this.urlsLists[0]}`;

      return await this.$axios.$get(url).then(response => {
        this.isLoading = true;
        console.log(response);
        return response;
      }).finally(() => {
        this.isLoading = false;
      });
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
