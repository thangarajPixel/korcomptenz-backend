export default {
  beforeCreate(event) {
    const { data } = event.params;
    if (data.slug) {
      data.slug = data?.slug?.trim();
    }
  },
  beforeUpdate(event) {
    const { data } = event.params;
    if (data.slug) {
      data.slug = data?.slug?.trim();
    }
  }
};