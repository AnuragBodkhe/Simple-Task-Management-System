pipeline {
    agent any

    environment {
        IMAGE_NAME = "task-management-app"
        CONTAINER_NAME = "task-container"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %IMAGE_NAME% .'
            }
        }

        stage('Run Container') {
            steps {
                bat '''
                docker stop %CONTAINER_NAME% || echo Not running
                docker rm %CONTAINER_NAME% || echo Not exists
                docker run -d -p 3000:3000 --name %CONTAINER_NAME% %IMAGE_NAME%
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline Success!'
        }
        failure {
            echo '❌ Pipeline Failed!'
        }
    }
}
