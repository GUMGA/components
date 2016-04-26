(function() {
    'use strict'

    MimeTypeService.$inject = []

    function MimeTypeService(){

        const mimetypes = {
            "application/zip": ["zip"],
            "application/x-zip": ["zip"],
            "application/x-compressed": ["zip"],
            "application/x-zip-compressed": ["zip"],
            "multipart/x-zip": ["zip"],
            "application/x-deb": ["deb"],
            "application/epub+zip": ["epub"],
            "application/font-woff": ["woff"],
            "application/json": ["json","map"],
            "application/json5": ["json5"],
            "application/msword": ["doc","dot"],
            "application/octet-stream": ["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","buffer"],
            "application/ogg": ["ogx"],
            "application/pdf": ["pdf"],
            "application/vnd.ms-excel": ["xls","xlm","xla","xlc","xlt","xlw"],
            "application/vnd.openofficeorg.extension": ["oxt"],
            "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"],
            "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"],
            "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"],
            "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"],
            "application/x-bittorrent": ["torrent"],
            "application/x-debian-package": ["deb","udeb"],
            "application/x-msdownload": ["exe","dll","com","bat","msi"],
            "application/x-rar": ["rar"],
            "application/x-rar-compressed": ["rar"],
            "application/x-sh": ["sh"],
            "application/x-sql": ["sql"],
            "application/x-tar": ["tar"],
            "application/x-web-app-manifest+json": ["webapp"],
            "application/xhtml+xml": ["xhtml","xht"],
            "application/xml": ["xml","xsl","xsd"],
            "audio/ogg": ["oga","ogg","spx"],
            "audio/x-flac": ["flac"],
            "audio/x-matroska": ["mka"],
            "audio/x-mpegurl": ["m3u"],
            "audio/x-ms-wax": ["wax"],
            "audio/x-ms-wma": ["wma"],
            "audio/x-wav": ["wav"],
            "image/bmp": ["bmp"],
            "image/cgm": ["cgm"],
            "image/g3fax": ["g3"],
            "image/gif": ["gif"],
            "image/ief": ["ief"],
            "image/jpeg": ["jpeg","jpg","jpe"],
            "image/ktx": ["ktx"],
            "image/png": ["png"],
            "image/prs.btif": ["btif"],
            "image/sgi": ["sgi"],
            "image/svg+xml": ["svg","svgz"],
            "image/tiff": ["tiff","tif"],
            "image/vnd.adobe.photoshop": ["psd"],
            "image/vnd.dece.graphic": ["uvi","uvvi","uvg","uvvg"],
            "image/vnd.djvu": ["djvu","djv"],
            "image/vnd.dvb.subtitle": ["sub"],
            "image/vnd.dwg": ["dwg"],
            "image/vnd.dxf": ["dxf"],
            "image/vnd.fastbidsheet": ["fbs"],
            "image/vnd.fpx": ["fpx"],
            "image/vnd.fst": ["fst"],
            "image/vnd.fujixerox.edmics-mmr": ["mmr"],
            "image/vnd.fujixerox.edmics-rlc": ["rlc"],
            "image/vnd.ms-modi": ["mdi"],
            "image/vnd.ms-photo": ["wdp"],
            "image/vnd.net-fpx": ["npx"],
            "image/vnd.wap.wbmp": ["wbmp"],
            "image/vnd.xiff": ["xif"],
            "image/webp": ["webp"],
            "image/x-3ds": ["3ds"],
            "image/x-cmu-raster": ["ras"],
            "image/x-cmx": ["cmx"],
            "image/x-freehand": ["fh","fhc","fh4","fh5","fh7"],
            "image/x-icon": ["ico"],
            "image/x-mrsid-image": ["sid"],
            "image/x-pcx": ["pcx"],
            "image/x-pict": ["pic","pct"],
            "image/x-portable-anymap": ["pnm"],
            "image/x-portable-bitmap": ["pbm"],
            "image/x-portable-graymap": ["pgm"],
            "image/x-portable-pixmap": ["ppm"],
            "image/x-rgb": ["rgb"],
            "image/x-tga": ["tga"],
            "image/x-xbitmap": ["xbm"],
            "image/x-xpixmap": ["xpm"],
            "image/x-xwindowdump": ["xwd"],
            "text/cache-manifest": ["appcache","manifest"],
            "text/css": ["css"],
            "text/csv": ["csv"],
            "text/hjson": ["hjson"],
            "text/html": ["html","htm"],
            "text/jade": ["jade"],
            "text/jsx": ["jsx"],
            "text/less": ["less"],
            "text/plain": ["txt","text","conf","def","list","log","in","ini"],
            "text/stylus": ["stylus","styl"],
            "video/h261": ["h261"],
            "video/h263": ["h263"],
            "video/h264": ["h264"],
            "video/mpeg": ["mpeg","mpg","mpe","m1v","m2v"],
            "video/webm": ["webm"],
            "video/x-ms-wmv": ["wmv"],
            "video/x-msvideo": ["avi"],
            "video/x-sgi-movie": ["movie"]
        }
        
        function getMimeTypes() {
            return mimetypes
        }
        function getExtensionsByMimeType(mimetype) {
            return mimetypes[mimetype]
        }
        function getExtensionByFileName(filename) {
            var parts = filename.split('.')
            return parts[parts.length - 1]
        }
        function validate(mimetype, accepted) {
            if (!Array.isArray(accepted)) return console.error('Accepted formats (var accepted) should be an array')
            if (!mimetypes[mimetype]) return console.error(`Mimetype (${mimetype}) unknown`)
            return mimetypes[mimetype].map(function(type) {
                return accepted.filter(function(value) {
                    return value == type
                }).length > 0
            })[0]
        }

        return { getMimeTypes, getExtensionsByMimeType, getExtensionByFileName, validate }
    }

    angular.module('gumga.services.mimetype', [])
    .factory('GumgaMimeTypeService', MimeTypeService);

})()