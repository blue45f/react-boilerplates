#!/bin/bash
# 프로젝트 정리 스크립트
# node_modules, .next, dist 폴더를 삭제합니다.

echo "루트폴더 내 모든 node_modules 폴더 및 빌드 결과물(dist, .next)을 삭제합니다."
find . \( -name 'node_modules' -o -name '.next' -o -name 'dist' \) -type d -prune -exec rm -rf '{}' +

if [[ $1 == "--store" ]]; then
  echo "pnpm 스토어를 삭제합니다."
  pnpm_store_path=$(pnpm store path)
  if [[ $pnpm_store_path ]]; then
    find $pnpm_store_path -type d -name 'files' -exec rm -rf '{}' +
  else
    echo 'pnpm 스토어 경로를 찾을 수 없습니다. 스토어를 수동으로 삭제 해주세요. (~/.pnpm-store)'
  fi
fi