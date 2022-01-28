var _ = require("underscore");

var promises = require("./promises");
var Html = require("./html");

exports.imgElement = imgElement;

function imgElement(func) {
    return function(element, messages) {
        return promises.when(func(element)).then(function(result) {
            var attributes = _.clone(result);
            if (element.altText) {
                attributes.alt = element.altText;
            }
            if (element.extent) {
                // @see https://blog.csdn.net/MooreLxr/article/details/120859899
                // 1inch=914400EMUs  px=inch*dpi
                const { cx, cy } = element.extent // 单位emus
                var emusPerInch = 914400
                const w = cx / emusPerInch * 96
                const h = cy / emusPerInch * 96
                attributes.style = `width: ${w}px; height:${h}px;`
            } else {
                // 防止超过边界
                attributes.style = 'width: 50%;'
            }
            return [Html.freshElement("img", attributes)];
        });
    };
}

// Undocumented, but retained for backwards-compatibility with 0.3.x
exports.inline = exports.imgElement;

exports.dataUri = imgElement(function(element) {
    return element.read("base64").then(function(imageBuffer) {
        return {
            src: "data:" + element.contentType + ";base64," + imageBuffer
        };
    });
});
