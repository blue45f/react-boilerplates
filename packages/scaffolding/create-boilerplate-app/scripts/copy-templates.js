const fs = require('fs-extra')
const path = require('path')

// 템플릿 디렉토리 경로
const templatesDir = path.join(__dirname, '../templates')
const destDir = path.join(__dirname, '../dist/templates')

// dist/templates 디렉토리가 있으면 삭제
fs.removeSync(destDir)

// templates 디렉토리를 dist/templates로 복사
fs.copySync(templatesDir, destDir, {
  dereference: true,
  filter: (src) => !src.includes('node_modules'),
})

console.log('템플릿 파일이 성공적으로 복사되었습니다.')
