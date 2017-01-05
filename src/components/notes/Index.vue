<template>
  <div class="notes" ref="notes">
    <note v-for="note in filteredNotes"
          :note="note">
    </note>
  </div>
</template>
<script>
  import noteRepository from '../../data/NoteRepository'
  import Masonry from 'masonry-layout'
  import EventBus from '../../components/EventBus'
  import Note from './Note'

  export default {
    components: {
      Note
    },
    data () {
      return {
        notes: [],
        searchQuery: ''
      }
    },
    watch: {
      'filteredNotes': {
        handler () {
          this.$nextTick(() => {
            this.masonry.reloadItems()
            this.masonry.layout()
          })
        }
      },
      deep: true
    },
    computed: {
      filteredNotes () {
        return this.notes.filter((note) => {
          if (this.searchQuery) return (note.title.indexOf(this.searchQuery) !== -1 || note.content.indexOf(this.searchQuery) !== -1) // returns truthy if query is found in title or content
          return true
        })
      }
    },
    mounted () {
      this.masonry = new Masonry(this.$refs.notes, {
        itemSelector: '.note',
        columnWidth: 320,
        gutter: 16,
        fitWidth: false
      })

      noteRepository.on('added', (note) => {
        this.notes.unshift(note)
      })
      noteRepository.on('changed', ({key, title, content}) => {
        let outdatedNote = noteRepository.find(this.notes, key)
        outdatedNote.title = title
        outdatedNote.content = content
      })
      noteRepository.on('removed', ({key}) => {
        let noteToRemove = noteRepository.findIndex(this.notes, key)
        this.notes.splice(noteToRemove, 1)
      })
      EventBus.$on('search', (searchQuery) => {
        this.searchQuery = searchQuery
      })
      noteRepository.attachFirebaseListeners()
    },
    destroyed () {
      noteRepository.detachFirebaseListeners()
      this.notes = []
    }
  }
</script>
<style>
  .notes {
    margin: 0px
  }
</style>
