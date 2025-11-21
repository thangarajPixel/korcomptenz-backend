
export default async function (plugin: any) {
  const originalService = plugin.services["image-manipulation"];
  // Override ONLY the optimize function
  plugin.services["image-manipulation"] = {
    ...originalService,
    optimize: async function (file: any) {
      return originalService.optimize(file);
    },
    // isImage: async function (file: any) {
    //   return originalService.isImage(file);
    // },
    // isOptimizableImage: async function (file: any) {
    //   return await originalService.isOptimizableImage(file);
    // },
    // // isResizableImage: async function (file: any) {
    // //   console.log(file, 'resizable-image-file');
    // //   return await originalService.isResizableImage(file);
    // // },
    // getDimensions: async function (file: any) {
    //   return await originalService.getDimensions(file);
    // },
    // generateResponsiveFormats: async function (file: any) {
    //   return await originalService.generateResponsiveFormats(file);
    // },
    // generateThumbnail: async function (file: any) {
    //   return await originalService.generateThumbnail(file);
    // },
    // generateFileName: async function (file: any) {
    //   return await originalService.generateFileName(file);
    // },
    isFaultyImage: async function (file: any) {
      // if (["image/svg+xml"].includes(file.mime)) return true;
      return await originalService.isFaultyImage(file);
    },
  };

  return plugin;
};
