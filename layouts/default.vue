<template>
  <div>
    <b-navbar type="is-link">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          SEO Assistant
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

    <section class="main-content">
      <nuxt />
    </section>

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
        <p class="section">
          <strong>Seo Assistant</strong> por <a href="https://www.github.com/teles">Teles</a>.
        </p>
      </div>
    </footer>
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
      }],
      footerItems: [{
        title: 'O que são boas práticas para SEO ?',
        content: 'Algumas características de SEO podem ajudar robôs de busca a melhorar o posicionamento de suas páginas. O SEO Assistant permite descobrir quais são as características a serem corrigidas ou melhoradas em suas páginas.'
      },{
        title: 'Como funciona?',
        content: 'O SEO Assistant checa metadados da sua página contra regras básicas de SEO inpage. Você pode configurar essas regras de acordo com as necessidades do seu projeto. Teste seus H1, meta description, imagens, e outros.'
      },{
        title: 'Como funciona?',
        content: 'O SEO Assistant checa metadados da sua página contra regras básicas de SEO inpage. Você pode configurar essas regras de acordo com as necessidades do seu projeto. Teste seus H1, meta description, imagens, e outros.'
      }]
    }
  }
}
</script>
