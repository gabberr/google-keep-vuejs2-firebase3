<template>
  <div class="note">
    <h2>{{note.title}}</h2>
    <pre>{{note.content}}</pre>
    <button type="button" v-on:click.stop="remove">
      <i class="fa fa-trash-o" aria-hidden="true"></i>
    </button>
    <button class="edit" type="button" @click="updateModal">
      <i class="fa fa-pencil" aria-hidden="true"></i>
    </button>
  </div>
</template>
<script>
  import noteRepository from '../../data/NoteRepository'
  import EventBus from '../EventBus'

  export default {
    props: ['note'],
    methods: {
      remove () {
        noteRepository.remove(this.note, (err) => {
          if (err) {
            EventBus.$emit('alert', {type: 'error', message: err.message})
          }
        })
      },
      updateModal () {
        EventBus.$emit('note.selected', this.note)
      }
    }
  }
</script>

<style>
  .note {
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 2px 10px #ccc;
    padding: 16px;
    width: 320px;
    margin: 16px 0;
  }
  .note h2{
    /*font-size: 1.1em;*/
    margin-bottom: 8px;
  }
  .note pre {
    font-size: 1.1em;
    margin-bottom: 10px;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: inherit;
  }
  .note button{
    background: none;
    border: none;
    font-size: 20px;
    opacity: 0;
    cursor: pointer;
    transition: opacity .5s;
    margin: 0 4px 0 0;
  }
  .note button.edit{
    float: right;
  }
  .note:hover, .note:focus{
    box-shadow: 0 1px 8px #797979;
  }
  .note:hover button, .note:focus button{
    opacity: 0.6;
  }
</style>
