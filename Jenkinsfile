pipeline {
    agent any

    tools {
        // 프론트엔드 빌드를 위한 NodeJS 도구 설정 
        nodejs 'NodeJS 20' 
        dockerTool 'docker'
    }

    environment {
          DOCKER_HUB_ID = 'maximum0'
          IMAGE_NAME = "maximum0/fastpick-fe"
          VM_IP = '192.168.56.111'
          VM_USER = 'maximum0'
          DEPLOY_PATH = '~/fastpick/app'
    }

    stages {
        stage('Source Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'BASE_API_URL', variable: 'API_URL')]) {
                        sh 'npm install'
                        sh 'VITE_API_URL=${API_URL} npx vite build'
                    }
                }
            }
        }

        stage('Dockerize') {
            steps {
                script {
                    // 도커 이미지 빌드
                    sh "docker build -t ${IMAGE_NAME}:latest ."

                    // 도커 허브 푸시
                    withCredentials([usernamePassword(
                        credentialsId: 'docker-hub-credentials',
                        passwordVariable: 'DOCKER_HUB_PASSWORD',
                        usernameVariable: 'DOCKER_HUB_USER'
                    )]) {
                        sh "docker login -u ${DOCKER_HUB_USER} -p ${DOCKER_HUB_PASSWORD}"
                        sh "docker push ${IMAGE_NAME}:latest"
                    }
                }
            }
        }

        stage('Remote Deploy') {
            steps {
                sshagent(['vm-ssh-key']) {
                    withCredentials([usernamePassword(
                        credentialsId: 'docker-hub-credentials',
                        passwordVariable: 'DOCKER_HUB_PASSWORD',
                        usernameVariable: 'DOCKER_HUB_USER'
                    )]) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ${VM_USER}@${VM_IP} \
                            "docker login -u ${DOCKER_HUB_USER} -p ${DOCKER_HUB_PASSWORD} && \
                             cd ${DEPLOY_PATH} && \
                             docker compose pull fastpick-fe && \
                             docker compose up -d fastpick-fe"
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo '✅ [성공] 프론트엔드 배포가 완료되었습니다.'
        }
        failure {
            echo '🚨 [실패] 프론트엔드 배포에 실패했습니다.'
        }
    }
}