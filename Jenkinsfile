pipeline {
    agent any

    parameters {
        booleanParam(name: 'DEPLOY_TO_AWS', defaultValue: false, description: 'Cria/inicia a EC2 e publica a interface.')
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
                ]) { sh 'aws sts get-caller-identity' }
            }
        }

        stage('Instalar, verificar e montar') {
            steps {
                sh 'docker run --rm --volumes-from "$HOSTNAME" -w "$WORKSPACE" node:22-bookworm-slim sh -c "npm ci && npm run lint && npm run build"'
            }
        }

        stage('Garantir EC2') {
            when { expression { params.DEPLOY_TO_AWS } }
            steps {
                withCredentials([
                    string(credentialsId: 'aws-access-key-id', variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws-secret-access-key', variable: 'AWS_SECRET_ACCESS_KEY'),
                    string(credentialsId: 'aws-session-token', variable: 'AWS_SESSION_TOKEN')
                ]) {
                    sh '''
                        USER_PUBLIC_IP=$(/workspace/jenkins/scripts/service-ip.sh user-service public)
                        TASK_PUBLIC_IP=$(/workspace/jenkins/scripts/service-ip.sh task-service public)
                        test "$USER_PUBLIC_IP" != 'None'
                        test "$TASK_PUBLIC_IP" != 'None'
                        /workspace/jenkins/scripts/ensure-ec2.sh tramporapido-ui > .ec2.env
                        printf 'USER_PUBLIC_IP=%s\nTASK_PUBLIC_IP=%s\n' "$USER_PUBLIC_IP" "$TASK_PUBLIC_IP" >> .ec2.env
                    '''
                }
            }
        }

        stage('Publicar e atualizar CORS') {
            when { expression { params.DEPLOY_TO_AWS } }
            steps {
                sshagent(credentials: ['ec2-deploy-key']) {
                    sh '''
                        . ./.ec2.env
                        UI_ORIGIN="http://${PUBLIC_IP}:3000"
                        /workspace/jenkins/scripts/deploy-compose.sh \
                          tramporapido-ui "$PUBLIC_IP" \
                          "http://${TASK_PUBLIC_IP}:8081" "http://${USER_PUBLIC_IP}:8080"
                        /workspace/jenkins/scripts/refresh-cors.sh user-service "$USER_PUBLIC_IP" "$UI_ORIGIN"
                        /workspace/jenkins/scripts/refresh-cors.sh task-service "$TASK_PUBLIC_IP" "$UI_ORIGIN"
                    '''
                }
            }
        }
    }
}
