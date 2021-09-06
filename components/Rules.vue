<template>
  <section class="columns">
  <b-menu class="column">
    <b-menu-list label="Configurações">
      <b-menu-item icon="information-outline" label="Info"></b-menu-item>
      <b-menu-item icon="settings" :active="isActive" expanded>
        <template #label="props">
          <b-icon class="is-pulled-left" icon="text-box-check"></b-icon>
          <span>Regras</span>
          <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-up' : 'menu-down'"></b-icon>
        </template>
        <b-menu-item icon="account" label="Títulos"></b-menu-item>
        <b-menu-item icon="cellphone-link">
          <template #label>
            Devices
            <b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-left">
              <template #trigger>
                <b-icon icon="dots-vertical"></b-icon>
              </template>
              <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
              <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
              <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
            </b-dropdown>
          </template>
        </b-menu-item>
        <b-menu-item icon="cash-multiple" label="Payments" disabled></b-menu-item>
      </b-menu-item>
      <b-menu-item icon="account" label="My Account">
        <b-menu-item label="Account data"></b-menu-item>
        <b-menu-item label="Addresses"></b-menu-item>
      </b-menu-item>
    </b-menu-list>
    <b-menu-list>
      <b-menu-item label="Expo" icon="link" tag="router-link" target="_blank" to="/expo"></b-menu-item>
    </b-menu-list>
    <b-menu-list label="Ações">
      <b-button label="Salvar" type="is-link" icon-left="content-save"></b-button>
      <b-button label="Exportar" type="is-link" icon-left="download"></b-button>
    </b-menu-list>
  </b-menu>
  <div class="column is-four-fifths">
    <b-field label="Seletor CSS">
      <b-input></b-input>
    </b-field>
    <b-field label="Quantidade">
      <b-select placeholder="Selecione a quantidade" required>
        <option value="zero">Nenhum</option>
        <option value="zero-plus">Nenhum ou mais</option>
        <option value="one">Somente 1</option>
        <option value="one-plus">1 ou mais</option>
        <option value="more-than-one">Mais que 1</option>
      </b-select>
    </b-field>
  </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      isActive: true
    }
  }
})
</script>
