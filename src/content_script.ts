const videoContentTypeRegex = /^video\/.*/;
if (videoContentTypeRegex.test(document.contentType)) {
    import("./index").then(mod => mod.main());
}
