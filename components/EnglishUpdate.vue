<template>
  <b-container>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group id="input-group-1" label="English:" label-for="input-1">
        <b-form-input id="input-1" v-model="form.english" placeholder="Enter english" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Vietnamese:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.vietnamese" placeholder="Enter vietnamese" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Example:" label-for="input-3">
        <b-form-textarea id="input-2" v-model="form.example" placeholder="Enter example" rows="3" max-rows="6"></b-form-textarea>
      </b-form-group>

      <b-form-group id="input-group-4" label="Image:" label-for="input-4">
        <div class="mb-2">
          <b-button-group>
            <b-button :variant="imageMode === 'file' ? 'primary' : 'outline-primary'" @click="imageMode = 'file'"
              size="sm">
              Upload File
            </b-button>
            <b-button :variant="imageMode === 'string' ? 'primary' : 'outline-primary'" @click="imageMode = 'string'"
              size="sm">
              Input String
            </b-button>
          </b-button-group>
        </div>

        <!-- File Upload Mode -->
        <div v-if="imageMode === 'file'">
          <b-form-file id="input-4" v-model="imageFile" placeholder="Choose an image file..."
            drop-placeholder="Drop image here..." accept="image/*" @change="handleImageChange"></b-form-file>
          <small class="form-text text-muted">Select an image file (JPG, PNG, GIF, etc.) - Max size: 2MB. Images will be
            automatically compressed.</small>

          <!-- Image Preview 150x150 căn trái -->
          <div v-if="form.image" class="mt-2">
            <img :src="form.image" alt="Preview"
              style="width: 150px; height: 150px; object-fit: cover; border: 1px solid #ddd;" />
          </div>
        </div>

        <!-- String Input Mode -->
        <div v-if="imageMode === 'string'">
          <b-form-input id="input-4-string" v-model="form.image"
            placeholder="Enter image URL (e.g., https://example.com/image.jpg) or base64 string"
            type="text"></b-form-input>
          <small class="form-text text-muted">Enter image URL (e.g., https://example.com/image.jpg) or base64
            string</small>

          <!-- Image Preview 150x150 căn trái -->
          <div v-if="form.image" class="mt-2">
            <img :src="form.image" alt="Preview"
              style="width: 150px; height: 150px; object-fit: cover; border: 1px solid #ddd;" />
          </div>
        </div>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        english: "",
        vietnamese: "",
        example: "",
        image: "",
      },
      imageFile: null,
      imageMode: 'string', // Default to string input mode
    };
  },
  mounted() {
    this.fetchSomething();
  },
  methods: {
    async fetchSomething() {
      const response = await this.$axios.$get(
        "http://localhost:8080/api/english/vocabulary/" + this.$route.params.id
      );

      this.form = response;
    },

    handleImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
          this.$bvToast.toast('File size too large. Please select an image smaller than 2MB.', {
            title: 'Error',
            variant: 'danger',
            solid: true
          });
          this.imageFile = null;
          return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
          this.$bvToast.toast('Please select a valid image file.', {
            title: 'Error',
            variant: 'danger',
            solid: true
          });
          this.imageFile = null;
          return;
        }

        this.compressAndConvertToBase64(file);
      }
    },

    compressAndConvertToBase64(file) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Set max dimensions
        const maxWidth = 800;
        const maxHeight = 600;

        let { width, height } = img;

        // Calculate new dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to base64 with compression
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);

        // Check if still too large (approximately)
        if (compressedBase64.length > 65535) {
          // Try with lower quality
          const moreCompressed = canvas.toDataURL('image/jpeg', 0.4);
          if (moreCompressed.length > 65535) {
            this.$bvToast.toast('Image is still too large after compression. Please select a smaller image.', {
              title: 'Error',
              variant: 'danger',
              solid: true
            });
            this.imageFile = null;
            return;
          }
          this.form.image = moreCompressed;
        } else {
          this.form.image = compressedBase64;
        }
      };

      img.src = URL.createObjectURL(file);
    },
    async onSubmit(event) {
      event.preventDefault();
      // const response = await this.$axios.$put(
      //   "http://localhost:8080/api/english/vocabulary/" + this.$route.params.id,
      //   this.form
      // );

      const response = await fetch("http://localhost:8080/api/english/vocabulary/" + this.$route.params.id, {
        method: "PUT",
        body: JSON.stringify(this.form),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      if (response) {
        this.$router.push({ path: "/english" });
      }
    },
    onReset(event) {
      event.preventDefault();
      this.form.english = "";
      this.form.vietnamese = "";
      this.form.example = "";
      this.form.image = "";
      this.imageFile = null;
    },
  },
};
</script>