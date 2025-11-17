
export default (plugin: any) => {
  // const originalService = plugin.services["image-manipulation"];
  // // Override ONLY the optimize function
  // plugin.services["image-manipulation"] = {
  //   ...originalService,
  //   optimize: async function (file: any) {
  //     // Call original optimizer
  //     return await originalService.optimize(file);
  //   },
  //   isImage: async function (file: any) {
  //     return await originalService.isImage(file);
  //   },
  //   isOptimizableImage: async function (file: any) {
  //     return await originalService.isOptimizableImage(file);
  //   },
  //   // isResizableImage: async function (file: any) {
  //   //   console.log(file, 'resizable-image-file');
  //   //   return await originalService.isResizableImage(file);
  //   // },
  //   getDimensions: async function (file: any) {
  //     return await originalService.getDimensions(file);
  //   },
  //   generateResponsiveFormats: async function (file: any) {
  //     return await originalService.generateResponsiveFormats(file);
  //   },
  //   generateThumbnail: async function (file: any) {
  //     return await originalService.generateThumbnail(file);
  //   },
  //   generateFileName: async function (file: any) {
  //     return await originalService.generateFileName(file);
  //   },
  //   isFaultyImage: async function (file: any) {
  //     const mime = file.mime || "";
  //     const name = file.name?.toLowerCase() || "";

  //     // Block SVG files
  //     if (mime.includes("image/svg+xml") || name.endsWith(".svg")) {
  //       throw new Error("SVG files are not allowed.");
  //     }
  //     return await originalService.isFaultyImage(file);
  //   },
  // };

  return plugin;
};
