#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
const templateArgIndex = args.findIndex((arg) => arg === '--template' || arg === '--boilerplate')
const hasTemplateArg = templateArgIndex >= 0
const templateArg = hasTemplateArg ? args[templateArgIndex + 1] : undefined
const templateRoot = hasTemplateArg
  ? templateArg
  : process.env.REACT_BOILERPLATES_TEMPLATE_PATH ||
    path.join(process.cwd(), '..', 'react-boilerplates', 'templates', 'app')

if (hasTemplateArg && !templateArg) {
  console.log('⚠️  --template/--boilerplate requires a path argument.')
  process.exit(2)
}

const projectRoot = process.cwd()
const templatePath = path.resolve(templateRoot)

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8')
}

function normalizeText(value) {
  return value.replace(/\r\n/g, '\n').trimEnd()
}

function relative(p) {
  return path.relative(projectRoot, p)
}

function fail(message, details = []) {
  console.log(`\n❌ ${message}`)
  details.forEach((line) => console.log(`   - ${line}`))
}

if (!templatePath || !fs.existsSync(templatePath)) {
  console.log('⚠️  react-boilerplates template path not found.')
  console.log(`   template path: ${templatePath}`)
  console.log('Set one by env var REACT_BOILERPLATES_TEMPLATE_PATH or --template <path>')
  process.exit(2)
}

const checks = [
  {
    name: 'API client implementation',
    local: path.join(projectRoot, 'src/services/api.ts'),
    template: path.join(templatePath, 'src/services/api.ts'),
  },
  {
    name: 'useFetch hook implementation',
    local: path.join(projectRoot, 'src/hooks/useFetch.ts'),
    template: path.join(templatePath, 'src/hooks/useFetch.ts'),
  },
  {
    name: 'API client tests',
    local: path.join(projectRoot, 'src/services/api.test.ts'),
    template: path.join(templatePath, 'src/services/api.test.ts'),
  },
  {
    name: 'useFetch tests',
    local: path.join(projectRoot, 'src/hooks/useFetch.test.ts'),
    template: path.join(templatePath, 'src/hooks/useFetch.test.ts'),
  },
]

const issues = []

for (const item of checks) {
  const localExists = fs.existsSync(item.local)
  const templateExists = fs.existsSync(item.template)

  if (!localExists) {
    issues.push(`${item.name}: local file missing (${relative(item.local)})`)
    continue
  }

  if (!templateExists) {
    issues.push(`template file missing (${relative(item.template)})`)
    continue
  }

  const localText = normalizeText(readFile(item.local))
  const templateText = normalizeText(readFile(item.template))

  if (localText !== templateText) {
    issues.push(`${item.name} differs from template`)
  }
}

function getDependencyVersion(jsonText, name) {
  const data = JSON.parse(jsonText)
  return (
    data?.dependencies?.[name] ??
    data?.devDependencies?.[name] ??
    data?.peerDependencies?.[name] ??
    data?.optionalDependencies?.[name] ??
    data?.overrides?.[name] ??
    data?.resolutions?.[name]
  )
}

const localPkgPath = path.join(projectRoot, 'package.json')
const templatePkgPath = path.join(templatePath, 'package.json')
const localLockPath = path.join(projectRoot, 'pnpm-lock.yaml')
const templateLockPath = path.join(templatePath, 'pnpm-lock.yaml')

if (fs.existsSync(localPkgPath) && fs.existsSync(templatePkgPath)) {
  const localPkgText = readFile(localPkgPath)
  const templatePkgText = readFile(templatePkgPath)
  const localKy = getDependencyVersion(localPkgText, 'ky')
  const templateKy = getDependencyVersion(templatePkgText, 'ky')

  if (localKy !== templateKy) {
    issues.push(
      `package.json ky specifier mismatch (local: ${String(localKy || 'missing')}, template: ${String(
        templateKy || 'missing'
      )})`
    )
  }
} else {
  if (!fs.existsSync(localPkgPath)) {
    issues.push('package.json missing')
  }

  if (!fs.existsSync(templatePkgPath)) {
    issues.push('template package.json missing')
  }
}

if (fs.existsSync(localLockPath) && fs.existsSync(templateLockPath)) {
  const localLock = readFile(localLockPath)
  const templateLock = readFile(templateLockPath)

  const localImportersKy = /^\s+ky:\n\s+specifier:\s+\^1\.14\.3/m.test(localLock)
  const templateImportersKy = /^\s+ky:\n\s+specifier:\s+\^1\.14\.3/m.test(templateLock)

  const localPackagesKy = /^\s{2}ky@1\.14\.3:/m.test(localLock)
  const templatePackagesKy = /^\s{2}ky@1\.14\.3:/m.test(templateLock)

  const localSnapshotKy = /^\s{2}ky@1\.14\.3:\s*$\n\s{2}{}\s*$/m.test(localLock)
  const templateSnapshotKy = /^\s{2}ky@1\.14\.3:\s*$\n\s{2}{}\s*$/m.test(templateLock)

  if (localImportersKy !== templateImportersKy) {
    issues.push(
      `pnpm-lock.yaml importer ky@^1.14.3 section mismatch (local: ${localImportersKy}, template: ${templateImportersKy})`
    )
  }

  if (localPackagesKy !== templatePackagesKy) {
    issues.push(
      `pnpm-lock.yaml ky package entry missing/mismatched (local: ${localPackagesKy}, template: ${templatePackagesKy})`
    )
  }

  if (localSnapshotKy !== templateSnapshotKy) {
    issues.push(
      `pnpm-lock.yaml ky snapshot entry missing/mismatched (local: ${localSnapshotKy}, template: ${templateSnapshotKy})`
    )
  }
} else {
  if (!fs.existsSync(localLockPath)) {
    issues.push('pnpm-lock.yaml missing')
  }
  if (!fs.existsSync(templateLockPath)) {
    issues.push('template pnpm-lock.yaml missing')
  }
}

if (issues.length > 0) {
  fail('Template sync check failed', issues)
  process.exit(1)
}

console.log('✅ template sync check passed')
console.log(' - 핵심 API/훅/lock 의존성 항목이 react-boilerplates 템플릿과 정합합니다.')
