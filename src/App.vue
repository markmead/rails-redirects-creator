<template>
  <div class="max-w-5xl px-8 py-16 mx-auto space-y-16 font-mono sm:py-24">
    <Header>
      <input type="file" ref="fileInput" class="hidden" @input="handleParseCSV" />

      <div class="flex space-x-4">
        <button @click="handleFileUploadOpener" class="px-8 py-4 border-2 border-black hover:bg-black hover:text-white">
          Upload CSV
        </button>

        <button
          v-clipboard:copy="generatedRedirects"
          v-clipboard:success="handleCopySuccess"
          v-clipboard:error="handleCopyError"
          class="px-8 py-4 border-2 border-black hover:bg-black hover:text-white"
        >
          Copy Redirects
        </button>
      </div>
    </Header>

    <section>
      <div class="max-w-5xl px-8 mx-auto space-y-6">
        <h2 class="text-3xl">Configure</h2>

        <div class="max-w-3xl space-y-4 md:flex md:space-y-0 md:space-x-4">
          <div>
            <label for="status" class="text-sm uppercase">
              Status
            </label>
            <input
              type="text"
              name="status"
              id="status"
              class="block w-full mt-1 border-2 border-black"
              placeholder="301"
              v-model="status"
            />
          </div>

          <div class="flex-1">
            <label for="delete" class="text-sm uppercase">
              Delete:
            </label>
            <input
              type="text"
              name="delete"
              id="delete"
              class="block w-full mt-1 border-2 border-black"
              placeholder="https://www.website.com"
              v-model="strip"
            />
          </div>
        </div>

        <div class="relative p-8 text-xs border-2 border-black h-96">
          <span class="absolute lowercase transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            Nothing to see here
          </span>

          <ul class="overflow-y-auto pace-y-2">
            <li v-for="(result, index) of results" :key="index" class="flex items-center pr-4 result-list-item">
              <button @click="handleRemoveResult(index)" class="inline-block p-2 text-white bg-red-600">
                Delete
              </button>
              <span class="ml-3">
                {{ formatRedirect(result[0], result[1]) }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  data() {
    return {
      code: false,
      results: [],
      status: '301',
      strip: '',
    }
  },
  computed: {
    generatedRedirects() {
      if (!this.results) return

      let redirects = ''

      for (let result of this.results) {
        redirects += `${this.formatRedirect(result[0], result[1])}\n`
      }

      return redirects
    },
  },
  methods: {
    handleFileUploadOpener() {
      this.$refs.fileInput.click()
    },
    handleParseCSV() {
      const fileInput = event.currentTarget
      const self = this

      this.$papa.parse(fileInput.files[0], {
        complete(response) {
          let results = response.data.filter(function(result) {
            return result[0] !== ''
          })

          self.results = results
        },
      })
    },
    formatRedirect(from, to) {
      return `get "${this.stripText(from)}", to: redirect("${this.stripText(to)}", status: ${this.status})`
    },
    stripText(string) {
      let substring = this.strip ? string.replace(this.strip, '') : string
      return substring === '' ? '/' : substring
    },
    handleRemoveResult(index) {
      this.results.splice(index, 1)
    },
    handleCopySuccess(event) {
      const button = event.currentTarget

      button.innerText = 'Copied'
      setTimeout(() => (button.innerText = 'Copy'), 2000)
    },
  },
  components: {
    Header,
  },
}
</script>

<style lang="postcss" scoped>
.result-list-item button:hover + span {
  @apply line-through;
}
</style>
