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
          <div v-if="isLoading === false && (report.approved.length > 0 || report.disapproved.length > 0)">
            <report-section
              title="Auditorias reprovadas"
              :report="report.disapproved">
            </report-section>
            <report-section
              title="Auditorias aprovadas"
              :report="report.approved">
            </report-section>
          </div>
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
          <rules></rules>
        </b-tab-item>
      </b-tabs>
    </section>
    <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false"></b-loading>
  </div>
</template>

<script type="typescript">
import Vue from 'vue'
import Rules from '~/components/Rules.vue'
import ReportSection from '~/components/ReportSection'
import RulesToReport from '~/modules/Rules/RulesToReport'
import InitialRules from '~/modules/Rules/InitialRules'

export default Vue.extend({
  components: {
    Rules,
    ReportSection
  },
  data() {
    return {
      urls: '',
      html: '',
      activeTab: 0,
      isLoading: false,
      isRulesOpen: false,
      report: {
        approved: [],
        disapproved: []
      }
    }
  },
  methods: {
    async processUrls() {
      const appScriptId = 'AKfycbzAjIXbOKHT4wSkGoKTkKeXWGuEr5-suBX7BOqew6stjxdLyEBUYSxfgyUCBnC1crNP';
      const url = `https://script.google.com/macros/s/${appScriptId}/exec?url=${this.urlsLists[0]}`;

      return await this.$axios.$get(url).then(response => {
        this.isLoading = true;
        const report = new RulesToReport(response.html, InitialRules).report;
        this.report = {
          approved: report.filter(r => r.isApproved),
          disapproved: report.filter(r => r.isApproved === false),
        };
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
