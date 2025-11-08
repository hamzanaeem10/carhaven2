pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDS = credentials('docker-hub-credentials')
        DOCKER_REGISTRY = 'hamzaak10'
        APP_NAME = 'carhaven'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'docker build -t $DOCKER_REGISTRY/$APP_NAME-backend:${BUILD_NUMBER} .'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'docker build -t $DOCKER_REGISTRY/$APP_NAME-frontend:${BUILD_NUMBER} .'
                }
            }
        }

        stage('Login to DockerHub') {
            steps {
                sh 'echo $DOCKER_HUB_CREDS_PSW | docker login -u $DOCKER_HUB_CREDS_USR --password-stdin'
            }
        }

        stage('Push Images') {
            steps {
                sh """
                    docker push $DOCKER_REGISTRY/$APP_NAME-backend:${BUILD_NUMBER}
                    docker push $DOCKER_REGISTRY/$APP_NAME-frontend:${BUILD_NUMBER}
                    docker tag $DOCKER_REGISTRY/$APP_NAME-backend:${BUILD_NUMBER} $DOCKER_REGISTRY/$APP_NAME-backend:latest
                    docker tag $DOCKER_REGISTRY/$APP_NAME-frontend:${BUILD_NUMBER} $DOCKER_REGISTRY/$APP_NAME-frontend:latest
                    docker push $DOCKER_REGISTRY/$APP_NAME-backend:latest
                    docker push $DOCKER_REGISTRY/$APP_NAME-frontend:latest
                """
            }
        }

        stage('Deploy') {
            steps {
                sh """
                    docker-compose -f docker-compose.prod.yml down || true
                    docker-compose -f docker-compose.prod.yml up -d
                """
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
    }
}