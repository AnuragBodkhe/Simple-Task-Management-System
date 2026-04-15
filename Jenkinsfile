pipeline {
    agent any

    environment {
        IMAGE_NAME = "task-management-app"
        CONTAINER_NAME = "task-container"
        PORT = "4001"   // ✅ changed from 3000
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

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
                echo "Stopping old container..."
                docker stop $CONTAINER_NAME || true
                docker rm $CONTAINER_NAME || true

                echo "Starting new container..."
                docker run -d -p $PORT:3000 --name $CONTAINER_NAME $IMAGE_NAME

                echo "App running at: http://localhost:$PORT"
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
