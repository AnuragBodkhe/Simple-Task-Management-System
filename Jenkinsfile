pipeline {
    agent any

    environment {
        IMAGE_NAME = "task-management-app"
        CONTAINER_NAME = "task-container"
        PORT = "3000"
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

        stage('Build Docker Image') {
            steps {
                bat 'echo Building Docker image...'
                bat 'docker build -t %IMAGE_NAME% .'
            }
        }

        stage('Run Container') {
            steps {
                bat '''
                echo ================================
                echo Cleaning old containers...
                echo ================================

                docker stop %CONTAINER_NAME% || echo Not running
                docker rm %CONTAINER_NAME% || echo Not exists

                echo ================================
                echo Killing port %PORT% if in use...
                echo ================================

                for /f "tokens=5" %%a in ('netstat -ano ^| findstr :%PORT%') do (
                    echo Killing PID %%a
                    taskkill /PID %%a /F || echo Already stopped
                )

                echo ================================
                echo Starting container...
                echo ================================

                docker run -d -p %PORT%:%PORT% --name %CONTAINER_NAME% %IMAGE_NAME%

                echo ================================
                echo Container started successfully!
                echo Access your app at:
                echo http://localhost:%PORT%
                echo ================================
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline executed successfully!'
        }
        failure {
            echo '❌ Pipeline failed! Check logs.'
        }
    }
}
