/**
 * WebView 애플리케이션을 위한 지원 브라우저 목록
 *
 * - iOS Safari 12 이상
 * - Chrome 107 이상
 * - Opera Mini 제외
 */
const WEBVIEW_SUPPORTED_BROWSERS_LIST = ['ios >= 12', 'chrome >= 107', 'not op_mini all']

module.exports = WEBVIEW_SUPPORTED_BROWSERS_LIST
module.exports.default = WEBVIEW_SUPPORTED_BROWSERS_LIST
