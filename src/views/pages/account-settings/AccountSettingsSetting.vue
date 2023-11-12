<script setup>
const Pages = ref([
  {
    type: 'Overview Page',
    email: true,
    browser: true,
    app: true,
  },
  {
    type: 'Indoor Page',
    email: true,
    browser: true,
    app: true,
  },
  {
    type: 'Outdoor page',
    email: true,
    browser: true,
    app: false,
  }
])

const selectedSetting = ref('Only when I\'m online')
</script>

<template>
  <VCard title="Pages Setting">

    <VTable class="text-no-wrap">
      <thead>
        <tr>
          <th scope="col">
            page
          </th>
          <th scope="col">
            Refresh (manual)
          </th>
          <th scope="col">
            Refresh (15s & manual)
          </th>
          <th scope="col">
            Refresh (5 min & manual)
          </th>
          <th scope="col">
            Refresh (1 hour & manual)
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="page in Pages"
          :key="page.type"
        >
          <td>
            {{ page.type }}
          </td>
          <td>
            <VCheckbox :value="page.selected === '1'" @click="page.selected = '1'" />
          </td>
          <td>
            <VCheckbox :value="page.selected === 'email'" @click="page.selected = 'email'" />
          </td>
          <td>
            <VCheckbox :value="page.selected === 'browser'" @click="page.selected = 'browser'" />
          </td>
          <td>
            <VCheckbox :value="page.selected === 'app'" @click="page.selected = 'app'" />
          </td>
        </tr>
      </tbody>
    </VTable>
    <VDivider />

  </VCard>
  <VCard title="User preference">
    <VCardText>
      <VForm @submit.prevent="() => {}">
        <p class="text-base font-weight-medium">
          Indoor or outdoor?
        </p>

        <VRow>
          <VCol
            cols="12"
            sm="6"
          >
            <VSelect
              v-model="selectedSetting"
              mandatory
              :items="['Only when I\'m online', 'Anytime']"
            />
          </VCol>
        </VRow>
        <p class="text-base font-weight-medium">
          Indoor or outdoor?
        </p>

        <VRow>
          <VCol
            cols="12"
            sm="6"
          >
            <VSelect
              v-model="selectedSetting"
              mandatory
              :items="['Only when I\'m online', 'Anytime']"
            />
          </VCol>
        </VRow>
        <p class="text-base font-weight-medium">
          Indoor or outdoor?
        </p>

        <VRow>
          <VCol
            cols="12"
            sm="6"
          >
            <VSelect
              v-model="selectedSetting"
              mandatory
              :items="['Only when I\'m online', 'Anytime']"
            />
          </VCol>
        </VRow>
        <div class="d-flex flex-wrap gap-4 mt-4">
          <VBtn type="submit">
            Save Changes
          </VBtn>
          <VBtn
            color="secondary"
            variant="tonal"
            type="reset"
          >
            Reset
          </VBtn>
        </div>
      </VForm>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.v-table {
  th {
    text-align: start !important;
  }
}
</style>
