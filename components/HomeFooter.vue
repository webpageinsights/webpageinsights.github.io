<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <div class="section">
        <div class="columns is-3-desktop">
          <div v-for="(item, index) in footerItems" :key="index" class="column">
            <h2 class="title-is-2">{{item.title}}</h2>
            <p class="text">{{item.content}}.</p>
          </div>
        </div>
      </div>
      <div class="section">
        <p>
          <strong>WebPage Insights</strong> is an Open Source project, <a href="https://www.github.com/webpageinsights/webpageinsights.github.io" target="_blank">check the code</a>.</p>
      </div>
    </div>
  </footer>
</template>

<script type="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      footerItems: [{
        title: 'O que são boas práticas para SEO ?',
        content: 'Algumas características de SEO podem ajudar robôs de busca a melhorar o posicionamento de suas páginas. O WebPage Insights permite descobrir quais são as características a serem corrigidas ou melhoradas em suas páginas.'
      },{
        title: 'Como funciona?',
        content: 'O SEO Assistant checa metadados da sua página contra regras básicas de SEO inpage. Você pode configurar essas regras de acordo com as necessidades do seu projeto. Teste seus H1, meta description, imagens, e outros.'
      },{
        title: 'Como funciona?',
        content: 'O WebPage Insights checa metadados da sua página contra regras básicas de SEO inpage. Você pode configurar essas regras de acordo com as necessidades do seu projeto. Teste seus H1, meta description, imagens, e outros.'
      }]
    }
  }
})
</script>
