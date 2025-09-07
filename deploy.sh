#!/bin/bash

# GCP 배포 스크립트
set -e

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 함수 정의
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 설정 변수
PROJECT_ID=${PROJECT_ID:-"your-project-id"}
REGION=${REGION:-"asia-northeast1"}
SERVICE_NAME="banbok-backend"

print_status "GCP 백엔드 배포를 시작합니다..."

# GCP 프로젝트 설정 확인
if [ "$PROJECT_ID" = "your-project-id" ]; then
    print_error "PROJECT_ID 환경변수를 설정해주세요."
    print_status "예: export PROJECT_ID=your-actual-project-id"
    exit 1
fi

print_status "프로젝트 ID: $PROJECT_ID"
print_status "리전: $REGION"

# gcloud CLI 설치 확인
if ! command -v gcloud &> /dev/null; then
    print_error "gcloud CLI가 설치되지 않았습니다."
    print_status "https://cloud.google.com/sdk/docs/install에서 설치해주세요."
    exit 1
fi

# 프로젝트 설정
print_status "GCP 프로젝트를 설정합니다..."
gcloud config set project $PROJECT_ID

# 필요한 API 활성화
print_status "필요한 GCP API를 활성화합니다..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Docker 이미지 빌드 및 푸시
print_status "Docker 이미지를 빌드하고 푸시합니다..."
docker build -f apps/backend/Dockerfile -t gcr.io/$PROJECT_ID/$SERVICE_NAME:latest .
docker push gcr.io/$PROJECT_ID/$SERVICE_NAME:latest

# Cloud Run에 배포
print_status "Cloud Run에 서비스를 배포합니다..."
gcloud run deploy $SERVICE_NAME \
    --image gcr.io/$PROJECT_ID/$SERVICE_NAME:latest \
    --region $REGION \
    --platform managed \
    --allow-unauthenticated \
    --port 3001 \
    --memory 512Mi \
    --cpu 1 \
    --max-instances 10 \
    --set-env-vars NODE_ENV=production

print_status "배포가 완료되었습니다!"

# 서비스 URL 확인
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region $REGION --format 'value(status.url)')
print_status "서비스 URL: $SERVICE_URL"

print_warning "데이터베이스 연결을 위해 환경변수를 추가로 설정해야 할 수 있습니다."
print_status "예: gcloud run services update $SERVICE_NAME --region $REGION --set-env-vars DATABASE_URL=your-db-url"