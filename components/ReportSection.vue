<template>
  <div class="block" style="margin-top: 40px;">
    <p class="title is-5">
      <b-icon
        :icon="icon"
        :type="type === 'approved' ? 'is-success' : 'is-danger' "
        size="is-small">
      </b-icon>
      <span style="margin-left: 10px;">{{title}} ({{report.length}})</span>
    </p>
    <b-collapse
      class="card"
      animation="slide"
      v-for="(line, index) of report"
      :key="index"
      :open="isOpen == index"
      @open="isOpen = index">
      <template #trigger="props">
        <div
          class="card-header"
          role="button"
        >
        <p class="card-header-title">
        <span
          class="tag"
          :class="{
            'is-danger': line.level === 'danger',
            'is-warning': line.level === 'warning',
            'is-info': line.level === 'info'}
         ">
          {{line.level}}
        </span>
        <span style="margin-left: 20px;">{{ line.text }}</span>
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
          <div v-if="line.targets.all.length > 0">
            <div
              v-if="elements.length > 0"
              v-for="(elements, index) in [line.targets.approved, line.targets.disapproved]"
              :key="index"
            >
              <p v-if="elements.length === 1">
                <span>Encontrado um elemento</span>
                <span class="tag is-light">{{line.selector}}</span>
                <span v-if="index === 0">aprovado</span><span v-else>reprovado</span>
                <span>na auditoria</span>
              </p>
              <p v-else>
                <span>Encontrados {{elements.length}} elementos</span>
                <span class="tag is-light">{{line.selector}}</span>
                <span v-if="index === 0">aprovados</span><span v-else>reprovados</span>
                <span>na auditoria</span>
              </p>
              <div
                v-for="(target, index) in elements"
                :key="index"
                class="block">
                <pre><code>{{target.outerHTML.toString().trim()}}</code></pre>
              </div>
            </div>
          </div>

          <div v-else>
            <p>Nenhum elemento <span class="tag is-light">{{line.selector}}</span> encontrado</p>
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script type="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      isOpen: null
    }
  },
  props: {
    type: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    report: {
      type: Array,
      required: true
    }
  }
})

</script>
