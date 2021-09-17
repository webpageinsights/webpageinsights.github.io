<template>
  <div>
    <section class="section container">
      <h1 class="title">Suas páginas usam boas práticas de SEO? </h1>
      <b-tabs v-model="activeTab">
        <b-tab-item label="URL" icon="format-list-bulleted-square">
          <div class="field">
            <b-field label="Insira 1 url válida">
              <b-input
                v-model="url"
                expanded
                type="text"
                name="url"
                @keyup.native.enter="processUrls"
                :disabled="isLoading">
              </b-input>
              <p class="control">
                <b-button
                  label="Testar url"
                  :type="isLoading ? 'is-loading is-info' : 'is-info'"
                  :disabled="isValidUrl === false"
                  @click="processUrls"
                />
              </p>
            </b-field>
          </div>
          <div v-if="isLoading === false">
            <section class="section">
              <p class="title is-1 has-text-success has-text-centered" v-if="false">99</p>
              <h2 class="subtitle is-4 has-text-centered" v-if="report.url">
                <a :href="url" target="_blank" class="is-underlined">
                  {{report.url}}
                  <b-icon
                    icon="open-in-new"
                    size="is-small">
                  </b-icon>
                </a>
              </h2>
            </section>
            <report-section
              v-if="report.results"
              icon="alert-octagon"
              type="disapproved"
              title="Auditorias reprovadas: pontos críticos"
              :report="report.results | areDisapprovedDanger ">
            </report-section>

            <report-section
              v-if="report.results"
              icon="alert-octagon"
              type="disapprovedNotDanger"
              title="Auditorias reprovadas: oportunidades de melhoria"
              :report="report.results | areDisapprovedWithoutDanger">
            </report-section>

            <report-section
              v-if="report.results"
              icon="alert-circle-check"
              type="approved"
              title="Auditorias aprovadas"
              :report="report.results | areApproved ">
            </report-section>
          </div>
        </b-tab-item>
        <b-tab-item label="Configurações" icon="cog">
          <rules></rules>
        </b-tab-item>
      </b-tabs>
    </section>
    <home-footer></home-footer>
  </div>
</template>

<script type="typescript">
import Vue from 'vue'
import HomeFooter from '~/components/HomeFooter'
import Rules from '~/components/Rules.vue'
import ReportSection from '~/components/ReportSection'
import RulesToReport from '~/modules/Rules/RulesToReport'
import InitialRules from '~/modules/Rules/InitialRules'

export default Vue.extend({
  // async asyncData(context) {
    // const rules = await context.$content('rules').fetch();
    // console.log(rules);
  // },
  components: {
    HomeFooter,
    Rules,
    ReportSection
  },
  data() {
    return {
      url: '',
      activeTab: 0,
      isLoading: false,
      report: {}
    }
  },
  filters: {
    areApproved(results) {
      return results.filter(r => r.isApproved);
    },
    areDisapprovedDanger(results) {
      return results.filter(r => r.isApproved === false && r.level === 'danger');
    },
    areDisapprovedWithoutDanger(results) {
      return results.filter(r => r.isApproved === false && r.level !== 'danger');
    }
  },
  methods: {
    async processUrls() {
      const appScriptId = 'AKfycbzAjIXbOKHT4wSkGoKTkKeXWGuEr5-suBX7BOqew6stjxdLyEBUYSxfgyUCBnC1crNP';
      const url = `https://script.google.com/macros/s/${appScriptId}/exec?url=${this.url}`;
      this.isLoading = true;
      return await this.$axios.$get(url).then(response => {
        this.report = new RulesToReport(this.url, response.html, InitialRules);
      }).finally(() => {
        this.isLoading = false;
      });
    }
  },
  computed: {
    isValidUrl() {
      const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
      return this.url.match(urlPattern);
    }
  }
})
</script>
