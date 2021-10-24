<template>
  <div class="container">
    <div class="section">
      <nav class="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
        <ul>
          <li><a href="#">WebPage Insights</a></li>
          <li><a href="#">Regras</a></li>
          <li><a href="#">{{rule.category}}</a></li>
          <li class="is-active"><a href="#" aria-current="page">{{title}}</a></li>
        </ul>
      </nav>
      <h1 class="title is-3">{{title}}</h1>
      <p class="is-underlined has-text-weight-light has-text-grey">Última atualização: {{rule.updatedAt}}</p>
      <article style="margin-top: 20px;">
        <nuxt-content :document="rule" class="content" />
      </article>
    </div>
  </div>
</template>

<script type="ts">
import Vue from 'vue'
import RuleToText from '~/modules/Rules/RuleToText'

export default Vue.extend({
  async asyncData(context) {
    const rules = await context.$content('rules').where({slug: context.params.slug}).fetch();
    const title = new RuleToText(rules[0]);
    return {
      title: title.text,
      rule: rules[0]
    }
  },
  head() {
    return {
      title: 'Título da página | WebPage Insights '
    }
  }
})

</script>
