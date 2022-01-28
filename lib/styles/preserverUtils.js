// 新增获取文档解析的样式、临时保存的样式
const currentDocumentStyle = {
  // 全局页面信息
  pageInfo: null,
  //当前表格的全局样式，用于继承
  curTableStyles: null,
  curTableRowStyles: null
};
exports.currentDocumentStyle = currentDocumentStyle