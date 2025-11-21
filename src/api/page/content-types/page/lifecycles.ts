export default {
  beforeCreate(event) {
    const { data } = event.params;
    if (data.slug) {
      let slug = data.slug.trim();
      // Add leading slash if missing
      if (!slug.startsWith('/')) {
        slug = '/' + slug;
      }
      data.slug = slug;
    }
  },
  beforeUpdate(event) {
    const { data } = event.params;
    if (data.slug) {
      let slug = data.slug.trim();
      // Add leading slash if missing
      if (!slug.startsWith('/')) {
        slug = '/' + slug;
      }
      data.slug = slug;
    }
  }

};