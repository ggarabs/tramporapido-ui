pipeline {
    agent any

    options {
        disableConcurrentBuilds()
    }

    environment {
        AWS_DEFAULT_REGION = 'us-east-1'
        AWS_PAGER = ''
    }

    stages {
        stage('Validar acesso AWS') {
            steps {
                withCredentials([
                    string(credentialsId: 'aws-access-key-id', variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws-secret-access-key', variable: 'AWS_SECRET_ACCESS_KEY'),
                    string(credentialsId: 'aws-session-token', variable: 'AWS_SESSION_TOKEN')
                ]) {
                    sh 'aws sts get-caller-identity'
                }
            }
        }

        stage('Instalar, verificar e montar') {
            steps {
                sh '''
                    docker run --rm --volumes-from "$HOSTNAME" -w "$WORKSPACE" \\
                      node:22-bookworm-slim \\
                      sh -c 'npm ci && npm run lint && npm run build'
                '''
            }
        }
    }
}
