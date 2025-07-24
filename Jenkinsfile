pipeline {
  agent any

  environment {
    NODE_VERSION = '18.x'
    BACKEND_DIR = 'backend'
    FRONTEND_DIR = 'frontend'
  }

  tools {
    nodejs "NodeJS_18"
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'master', url: 'https://github.com/BibhaKhadka/Bankingsystem.git'
      }
    }

    stage('Frontend: Install Dependencies') {
      steps {
        dir("${FRONTEND_DIR}") {
          bat 'npm install'
          bat 'npm install -D serve'
        }
      }
    }

    stage('Frontend: Build') {
      steps {
        dir("${FRONTEND_DIR}") {
          bat '''
          set CI=false
          npm run build
          '''
        }
      }
    }

    stage('Backend: Install Dependencies') {
      steps {
        dir("${BACKEND_DIR}") {
          bat 'npm install'
          bat 'npm install --save-dev cross-env'
        }
      }
    }

    stage('Backend: Build') {
      steps {
        dir("${BACKEND_DIR}") {
          bat 'npx tsc'
        }
      }
    }

    stage('Backend: Run Tests') {
      steps {
        dir("${BACKEND_DIR}") {
          bat 'npm test'
        }
      }
    }

    stage('Approval: Deploy to Staging?') {
      steps {
        script {
          input message: 'Proceed to staging deployment?', ok: 'Yes, Deploy to Staging'
        }
      }
    }

    stage('Deploy to Staging VM') {
      steps {
        sshagent(credentials: ['vm-deploy-key']) {
          sh '''
            ssh -o StrictHostKeyChecking=no bibha@192.168.1.73 << 'ENDSSH'
              pkill -f "npm run start:staging" || true
              pkill -f "serve -s build" || true

              cd Bankingsystem
              git pull origin master

              cd backend
              npm install
              npm run start:staging &

              cd ../frontend
              npm install
              npm run build
              nohup serve -s build -l 3000 &
            ENDSSH
          '''
        }
      }
    }

    stage('Approval: Deploy to Production?') {
      steps {
        script {
          input message: 'Proceed to production deployment?', ok: 'Yes, Deploy to Production'
        }
      }
    }

    stage('Deploy to Production VM') {
      steps {
        sshagent(credentials: ['vm-deploy-key']) {
          sh '''
            ssh -o StrictHostKeyChecking=no bibha@192.168.1.74 << 'ENDSSH'
              pkill -f "npm run start:prod" || true
              pkill -f "serve -s build" || true

              cd Bankingsystem
              git pull origin master

              cd backend
              npm install
              npm run start:prod &

              cd ../frontend
              npm install
              npm run build:prod
              nohup serve -s build -l 80 &
            ENDSSH
          '''
        }
      }
    }
  }

  post {
    success {
      echo 'Pipeline completed successfully!'
    }
    failure {
      echo 'Pipeline failed.'
    }
  }
}
