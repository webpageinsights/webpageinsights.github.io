<template>
  <div class="container">
    <section class="section">
      <h1 class="title">Suas páginas usam boas práticas de SEO? </h1>
      <b-tabs v-model="activeTab">
        <b-tab-item label="URL" icon="format-list-bulleted-square">
          <div class="field">
            <b-field label="Insira 1 url válida">
              <b-input v-model="urls" type="text" :disabled="isLoading"></b-input>
            </b-field>
          </div>
          <b-button
            label="Testar url"
            :type="isLoading ? 'is-loading is-info' : 'is-info'"
            :disabled="areAllUrlsValid === false"
            @click="processUrls"
          />
          <div v-if="isLoading === false && (report.approved.length > 0 || report.disapproved.length > 0)">
            <report-section
              icon="alert-octagon"
              type="disapproved"
              title="Auditorias reprovadas"
              :report="report.disapproved">
            </report-section>
            <report-section
              icon="alert-circle-check"
              type="approved"
              title="Auditorias aprovadas"
              :report="report.approved">
            </report-section>
          </div>
        </b-tab-item>
        <b-tab-item label="Configurações" icon="cog">
          <rules></rules>
        </b-tab-item>
      </b-tabs>
    </section>
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
      this.isLoading = true;

      return await this.$axios.$get(url).then(response => {
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
