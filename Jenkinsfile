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
                sh 'echo Installing dependencies...'
                sh 'npm install'
            }
        }

        // ✅ Docker check
        stage('Verify Docker') {
            steps {
                sh 'docker --version'
                sh 'docker ps'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'echo Building Docker image...'
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                echo "================================"
                echo "Cleaning old containers..."
                echo "================================"

                docker stop $CONTAINER_NAME || true
                docker rm $CONTAINER_NAME || true

                echo "================================"
                echo "Starting container..."
                echo "================================"

                docker run -d -p $PORT:$PORT --name $CONTAINER_NAME $IMAGE_NAME

                echo "================================"
                echo "Container started successfully!"
                echo "Access your app at:"
                echo "http://localhost:$PORT"
                echo "================================"
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
