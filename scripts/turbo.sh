#!/bin/bash
# Turbo 실행 스크립트
# @template/* 패키지는 빌드/린트 대상에서 제외합니다.

turbo run "$@" --filter '!@template/*'