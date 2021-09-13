<template>
  <div class="block" style="margin-top: 40px;">
    <p class="title is-4">
      {{title}} ({{report.length}})
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
          <div v-for="(target, index) in line.targets.all" :key="index"  v-if="line.targets.all.length > 0" class="block">
            <pre><code>{{target.outerHTML.toString().trim()}}</code></pre>
          </div>
          <div v-else>
            Nenhum elemento encontrado
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
