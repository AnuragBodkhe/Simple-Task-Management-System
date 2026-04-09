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
                bat 'echo Installing dependencies...'
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'echo Building project...'
                bat 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'echo Building Docker image...'
                bat 'docker build -t %IMAGE_NAME% .'
            }
        }

        stage('Run Container') {
            steps {
                bat 'echo Running Docker container...'

                // Stop old container if exists
                bat '''
                docker stop %CONTAINER_NAME% || echo Not running
                docker rm %CONTAINER_NAME% || echo Not exists
                '''

                // Run new container
                bat 'docker run -d -p 3000:3000 --name %CONTAINER_NAME% %IMAGE_NAME%'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline executed successfully!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
    }
}
