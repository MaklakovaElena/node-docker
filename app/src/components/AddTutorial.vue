<template>
  <div class="submit-form">
    <h4>Create new artical</h4>
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="tutorial.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="text">Text</label>
        <input
          class="form-control"
          id="text"
          required
          v-model="tutorial.text"
          name="text"
        />
      </div>

      <button @click="saveTutorial" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
  </div>
</template>
  
  <script>
  import TutorialDataService from "../services/TutorialDataService";
  
  export default {
    name: "add-tutorial",
    data() {
      return {
        tutorial: {
          id: null,
          title: "",
          text: ""
        },
        submitted: false
      };
    },
    methods: {
      saveTutorial() {
        var data = {
          title: this.tutorial.title,
          text: this.tutorial.text
        };
  
        TutorialDataService.create(data)
          .then(response => {
            this.tutorial.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
      },
      
      newTutorial() {
        this.submitted = false;
        this.tutorial = {};
      }
    }
  };
  </script>
  
  <style>
  .submit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>